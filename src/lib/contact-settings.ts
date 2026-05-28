import { createClient } from "next-sanity";
import { siteConfig as staticSiteConfig } from "@/data/site";
import {
  isSanityConfigured,
  sanityApiVersion,
  sanityDataset,
  sanityProjectId,
} from "@/sanity/env";

const contactSettingsQuery = `*[_type == "siteSettings"][0]{
  email,
  phone,
  whatsapp
}`;

export type ContactRecipients = {
  email: { business: string; personal: string };
  phone: string;
  whatsapp: string;
  source: "sanity" | "local";
};

/** Always reads the latest contact details from Sanity (no CDN cache). */
export async function getContactRecipients(): Promise<ContactRecipients> {
  if (!isSanityConfigured || !sanityProjectId) {
    return {
      email: { ...staticSiteConfig.email },
      phone: staticSiteConfig.phone,
      whatsapp: staticSiteConfig.whatsapp || staticSiteConfig.phone,
      source: "local",
    };
  }

  const freshClient = createClient({
    projectId: sanityProjectId,
    dataset: sanityDataset,
    apiVersion: sanityApiVersion,
    useCdn: false,
    perspective: "published",
  });

  const settings = await freshClient.fetch<{
    email?: { business?: string; personal?: string };
    phone?: string;
    whatsapp?: string;
  } | null>(contactSettingsQuery);

  if (settings) {
    return {
      email: {
        business: settings.email?.business?.trim() ?? "",
        personal: settings.email?.personal?.trim() ?? "",
      },
      phone: settings.phone?.trim() ?? "",
      whatsapp: (settings.whatsapp || settings.phone)?.trim() ?? "",
      source: "sanity",
    };
  }

  return {
    email: { ...staticSiteConfig.email },
    phone: staticSiteConfig.phone,
    whatsapp: staticSiteConfig.whatsapp || staticSiteConfig.phone,
    source: "local",
  };
}
