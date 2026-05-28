/** Strip to digits for wa.me links (e.g. +256 700 123456 → 256700123456) */
export function formatWhatsAppNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

export function buildWhatsAppUrl(
  phone: string,
  text: string
): string {
  const digits = formatWhatsAppNumber(phone);
  if (!digits) return "";
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function buildContactWhatsAppMessage(params: {
  contactType: "business" | "personal";
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  const label =
    params.contactType === "business" ? "Business inquiry" : "Personal message";

  return [
    `*${label} — Tkryce Tech Solutions*`,
    "",
    `*Name:* ${params.name}`,
    `*Email:* ${params.email}`,
    `*Subject:* ${params.subject}`,
    "",
    `*Message:*`,
    params.message,
  ].join("\n");
}
