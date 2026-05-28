import { Resend } from "resend";

/** Resend test sender — required on free plan until your domain is verified. */
export const RESEND_DEFAULT_FROM = "onboarding@resend.dev";

export function getResendFromAddress(): string {
  const configured = process.env.RESEND_FROM_EMAIL?.trim();
  if (!configured) return RESEND_DEFAULT_FROM;
  if (configured.includes("@") && !configured.includes("<")) {
    return `Tkryce Tech Solutions <${configured}>`;
  }
  return configured;
}

/** True when a custom verified-domain sender is configured. */
export function isResendDomainVerified(): boolean {
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  if (!from) return false;
  return !from.includes("onboarding@resend.dev");
}

type ResendErrorLike = {
  message?: string;
  name?: string;
  statusCode?: number | null;
};

export function isResendFreeTierRestriction(error: ResendErrorLike): boolean {
  const msg = (error.message || "").toLowerCase();
  return (
    msg.includes("only send testing emails") ||
    msg.includes("verify a domain") ||
    msg.includes("your own email address")
  );
}

export function formatResendError(error: ResendErrorLike): string {
  const msg = error.message || "Unknown error from Resend.";

  if (isResendFreeTierRestriction(error)) {
    return (
      "Resend free plan: add RESEND_ACCOUNT_EMAIL to .env.local (the email you used to sign up at Resend), " +
      "or verify your domain at resend.com/domains so messages can go to your Studio contact emails."
    );
  }

  if (msg.toLowerCase().includes("api key")) {
    return "Invalid Resend API key. Create a new key at resend.com/api-keys and update RESEND_API_KEY in .env.local.";
  }

  if (
    msg.toLowerCase().includes("from") ||
    msg.toLowerCase().includes("sender")
  ) {
    return (
      "Invalid sender address. Use onboarding@resend.dev until your domain is verified, or set RESEND_FROM_EMAIL after verifying your domain in Resend."
    );
  }

  return msg;
}

export type ContactEmailPayload = {
  contactType: "business" | "personal";
  name: string;
  email: string;
  subject: string;
  message: string;
  intendedRecipient: string;
};

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildContactEmailHtml(
  payload: ContactEmailPayload,
  options: { forwarded: boolean }
): string {
  const typeLabel =
    payload.contactType === "business" ? "Business Inquiry" : "Personal";
  const forwardNote = options.forwarded
    ? `<p style="background:#fef3c7;padding:12px;border-radius:8px;color:#92400e;">
        <strong>Free-plan forwarding:</strong> This message was sent to your Resend account email
        because your domain is not verified yet. Intended inbox:
        <a href="mailto:${escapeHtml(payload.intendedRecipient)}">${escapeHtml(payload.intendedRecipient)}</a>
      </p>`
    : "";

  return `
    ${forwardNote}
    <h2>New ${typeLabel} from your website</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> <a href="mailto:${escapeHtml(payload.email)}">${escapeHtml(payload.email)}</a></p>
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <hr />
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(payload.message).replace(/\n/g, "<br />")}</p>
  `;
}

/** Pick deliver-to address: Studio email when domain verified, else Resend signup email. */
export function resolveResendRecipient(intendedRecipient: string): {
  to: string;
  forwarded: boolean;
} {
  const intended = intendedRecipient.trim().toLowerCase();

  if (isResendDomainVerified()) {
    return { to: intendedRecipient.trim(), forwarded: false };
  }

  const accountEmail = process.env.RESEND_ACCOUNT_EMAIL?.trim();
  if (accountEmail) {
    const account = accountEmail.toLowerCase();
    return {
      to: accountEmail,
      forwarded: account !== intended,
    };
  }

  return { to: intendedRecipient.trim(), forwarded: false };
}

export async function sendContactEmail(
  resend: Resend,
  payload: ContactEmailPayload
): Promise<{ ok: true } | { ok: false; error: ResendErrorLike }> {
  const { to, forwarded } = resolveResendRecipient(payload.intendedRecipient);
  const typeLabel =
    payload.contactType === "business" ? "Business Inquiry" : "Personal";
  const from = getResendFromAddress();

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: payload.email,
    subject: `[${typeLabel}] ${payload.subject} — ${payload.name}`,
    html: buildContactEmailHtml(payload, { forwarded }),
  });

  if (!error) return { ok: true };

  // Last resort: retry to account email if free-tier error and we didn't already
  if (
    isResendFreeTierRestriction(error) &&
    !forwarded &&
    process.env.RESEND_ACCOUNT_EMAIL?.trim()
  ) {
    const accountEmail = process.env.RESEND_ACCOUNT_EMAIL!.trim();
    const retry = await resend.emails.send({
      from,
      to: [accountEmail],
      replyTo: payload.email,
      subject: `[${typeLabel}] ${payload.subject} — ${payload.name}`,
      html: buildContactEmailHtml(payload, { forwarded: true }),
    });
    if (!retry.error) return { ok: true };
    return { ok: false, error: retry.error };
  }

  return { ok: false, error };
}
