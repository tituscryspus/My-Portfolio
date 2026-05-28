import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getContactRecipients } from "@/lib/contact-settings";
import { formatResendError, sendContactEmail } from "@/lib/resend";
import {
  buildContactWhatsAppMessage,
  buildWhatsAppUrl,
} from "@/lib/whatsapp";

type ContactBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
  contactType: "business" | "personal";
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, subject, message, contactType } = body;

    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (contactType !== "business" && contactType !== "personal") {
      return NextResponse.json({ error: "Invalid contact type." }, { status: 400 });
    }

    const contactSettings = await getContactRecipients();
    const recipientEmail =
      contactType === "business"
        ? contactSettings.email.business
        : contactSettings.email.personal;

    if (!recipientEmail) {
      return NextResponse.json(
        {
          error: `No ${contactType} email set. Add it in Site Settings at /studio (Contact section).`,
        },
        { status: 503 }
      );
    }

    const whatsappNumber =
      contactSettings.whatsapp || contactSettings.phone;
    const whatsappText = buildContactWhatsAppMessage({
      contactType,
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
    });
    const whatsappUrl = buildWhatsAppUrl(whatsappNumber, whatsappText);

    let emailSent = false;
    let emailError: string | null = null;
    const resendKey = process.env.RESEND_API_KEY?.trim();

    if (!resendKey) {
      emailError =
        "Email not configured. Add RESEND_API_KEY to .env.local (get one free at resend.com).";
    } else {
      const resend = new Resend(resendKey);
      const result = await sendContactEmail(resend, {
        contactType,
        name: name.trim(),
        email: email.trim(),
        subject: subject.trim(),
        message: message.trim(),
        intendedRecipient: recipientEmail,
      });

      if (!result.ok) {
        console.error("Resend error:", result.error);
        emailError = formatResendError(result.error);
      } else {
        emailSent = true;
      }
    }

    if (!emailSent && !whatsappUrl) {
      return NextResponse.json(
        { error: emailError || "Contact delivery is not configured." },
        { status: 503 }
      );
    }

    if (!emailSent && whatsappUrl) {
      return NextResponse.json({
        success: true,
        emailSent: false,
        emailError,
        whatsappUrl,
        recipientEmail,
      });
    }

    return NextResponse.json({
      success: true,
      emailSent: true,
      emailError: null,
      whatsappUrl: whatsappUrl || null,
      recipientEmail,
    });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
