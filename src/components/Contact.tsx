"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  User,
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
  MessageCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import { siteConfig as defaultSiteConfig } from "@/data/site";
import { defaultPageSections } from "@/data/sections";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { SectionIntro as SectionIntroContent, SiteConfig } from "@/types/content";

type ContactType = "business" | "personal";

export default function Contact({
  siteConfig = defaultSiteConfig,
  section = defaultPageSections.contact,
  standalone = false,
}: {
  siteConfig?: SiteConfig;
  section?: SectionIntroContent;
  standalone?: boolean;
}) {
  const [contactType, setContactType] = useState<ContactType>("business");
  const [submitted, setSubmitted] = useState(false);
  const [submitNote, setSubmitNote] = useState<string | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const whatsappNumber = siteConfig.whatsapp || siteConfig.phone;
  const whatsappHref = buildWhatsAppUrl(
    whatsappNumber,
    "Hello, I'd like to get in touch with Tkryce Tech Solutions."
  );

  const openWhatsAppTab = (url: string, popup: Window | null) => {
    if (popup && !popup.closed) {
      popup.location.href = url;
      popup.focus();
      return true;
    }
    const opened = window.open(url, "_blank", "noopener,noreferrer");
    return Boolean(opened);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSubmitNote(null);
    setWhatsappUrl(null);

    // Open synchronously on click so browsers don't block the popup after fetch
    const whatsappPopup = window.open("about:blank", "_blank");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          contactType,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        whatsappPopup?.close();
        throw new Error(data.error || "Failed to send message.");
      }

      let whatsappOpened = false;
      if (data.whatsappUrl) {
        setWhatsappUrl(data.whatsappUrl);
        whatsappOpened = openWhatsAppTab(data.whatsappUrl, whatsappPopup);
      } else {
        whatsappPopup?.close();
      }

      if (data.emailSent) {
        setSubmitNote(
          data.whatsappUrl
            ? whatsappOpened
              ? "Your email was delivered. WhatsApp opened — tap Send there to complete your message."
              : "Your email was delivered. Use the Open WhatsApp button below if a new tab did not appear."
            : "Your email was delivered successfully."
        );
      } else if (data.emailError) {
        setSubmitNote(
          data.whatsappUrl
            ? whatsappOpened
              ? `Email could not be sent: ${data.emailError} WhatsApp was opened so you can still reach us there.`
              : `Email could not be sent: ${data.emailError} Use the Open WhatsApp button below.`
            : data.emailError
        );
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });

      setTimeout(() => {
        setSubmitted(false);
        setSubmitNote(null);
        setWhatsappUrl(null);
      }, 15000);
    } catch (err) {
      whatsappPopup?.close();
      setError(err instanceof Error ? err.message : "Failed to send message.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={standalone ? undefined : "contact"} className="relative py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 bottom-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        <div className="absolute -left-20 bottom-20 h-80 w-80 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {!standalone && <SectionIntro section={section} />}

        <div className={`flex justify-center gap-4 ${standalone ? "" : "mt-12"}`}>
          <button
            type="button"
            onClick={() => setContactType("business")}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
              contactType === "business"
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "glass text-muted hover:text-foreground"
            }`}
          >
            <Building2 className="h-4 w-4" />
            Business Inquiry
          </button>
          <button
            type="button"
            onClick={() => setContactType("personal")}
            className={`flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all ${
              contactType === "personal"
                ? "bg-gradient-to-r from-primary to-accent text-white"
                : "glass text-muted hover:text-foreground"
            }`}
          >
            <User className="h-4 w-4" />
            Reach Me Personally
          </button>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="glass rounded-2xl p-8">
              <h3 className="text-xl font-bold">
                {contactType === "business"
                  ? "Partner With Tkryce"
                  : `Connect With ${siteConfig.founder.name}`}
              </h3>
              <p className="mt-3 text-muted">
                {contactType === "business"
                  ? "Ready to start your next project? Tell us about your vision and we'll get back to you within 24 hours."
                  : "Looking to collaborate, discuss opportunities, or just say hello? Drop me a message."}
              </p>

              <div className="mt-8 space-y-4">
                {(contactType === "business"
                  ? siteConfig.email.business
                  : siteConfig.email.personal) ? (
                  <a
                    href={`mailto:${
                      contactType === "business"
                        ? siteConfig.email.business
                        : siteConfig.email.personal
                    }`}
                    className="flex items-center gap-3 text-muted transition-colors hover:text-primary"
                  >
                    <Mail className="h-5 w-5 shrink-0 text-primary" />
                    {contactType === "business"
                      ? siteConfig.email.business
                      : siteConfig.email.personal}
                  </a>
                ) : null}
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-3 text-muted transition-colors hover:text-primary"
                >
                  <Phone className="h-5 w-5 shrink-0 text-primary" />
                  {siteConfig.phone}
                </a>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted transition-colors hover:text-[#25D366]"
                  >
                    <MessageCircle className="h-5 w-5 shrink-0 text-[#25D366]" />
                    WhatsApp: {whatsappNumber}
                  </a>
                )}
                <div className="flex items-center gap-3 text-muted">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  {siteConfig.location}
                </div>
              </div>

              <div className="mt-8 flex gap-3">
                {[
                  { icon: Github, href: siteConfig.social.github, label: "GitHub" },
                  { icon: Linkedin, href: siteConfig.social.linkedin, label: "LinkedIn" },
                  { icon: Twitter, href: siteConfig.social.twitter, label: "Twitter" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-10 w-10 items-center justify-center rounded-lg glass text-muted transition-all hover:border-primary/30 hover:text-primary"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form onSubmit={handleSubmit} className="glass rounded-2xl p-8">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <CheckCircle className="h-16 w-16 text-primary" />
                  <h3 className="mt-4 text-2xl font-bold">Message Sent!</h3>
                  {submitNote && (
                    <p className="mt-2 max-w-md text-sm text-muted">{submitNote}</p>
                  )}
                  {whatsappUrl && (
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#25D366] px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                    >
                      <MessageCircle className="h-5 w-5" />
                      Open WhatsApp
                    </a>
                  )}
                </motion.div>
              ) : (
                <>
                  {error && (
                    <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200">
                      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
                      <p>{error}</p>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-sm font-medium">
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        disabled={loading}
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary/50 disabled:opacity-60"
                        placeholder="Lukaye Titus Cryspus"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        disabled={loading}
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary/50 disabled:opacity-60"
                        placeholder="titus@example.com"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label htmlFor="subject" className="mb-2 block text-sm font-medium">
                      Subject
                    </label>
                    <input
                      id="subject"
                      type="text"
                      required
                      disabled={loading}
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary/50 disabled:opacity-60"
                      placeholder={
                        contactType === "business"
                          ? "Project inquiry / Partnership"
                          : "Collaboration / Networking"
                      }
                    />
                  </div>

                  <div className="mt-6">
                    <label htmlFor="message" className="mb-2 block text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      disabled={loading}
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground outline-none transition-colors focus:border-primary/50 disabled:opacity-60"
                      placeholder="Tell us about your project or how we can help..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent py-4 text-base font-semibold text-white transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Send Message
                      </>
                    )}
                  </button>
                </>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
