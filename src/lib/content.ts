import { cache } from "react";
import { siteConfig as staticSiteConfig, services as staticServices, stats as staticStats } from "@/data/site";
import { projects as staticProjects } from "@/data/projects";
import { sanityClient } from "@/sanity/lib/client";
import { urlForImage } from "@/sanity/lib/image";
import {
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  statsQuery,
} from "@/sanity/lib/queries";
import { isSanityConfigured } from "@/sanity/env";
import type {
  Project,
  Service,
  ServiceIcon,
  SiteConfig,
  SiteContent,
  Stat,
} from "@/types/content";

const staticContent: SiteContent = {
  siteConfig: staticSiteConfig,
  services: staticServices as Service[],
  projects: staticProjects,
  stats: staticStats,
};

type SanityImage = { asset?: { _ref?: string } } | null | undefined;

function imageUrl(image: SanityImage, fallback: string): string {
  if (!image) return fallback;
  const url = urlForImage(image);
  return url || fallback;
}

type SanitySiteSettings = {
  businessName?: string;
  tagline?: string;
  description?: string;
  descriptionCta?: string;
  email?: { business?: string; personal?: string };
  phone?: string;
  whatsapp?: string;
  location?: string;
  social?: { github?: string; linkedin?: string; twitter?: string };
  logo?: SanityImage;
  heroImage?: SanityImage;
  teamImage?: SanityImage;
  workspaceImage?: SanityImage;
  officeImage?: SanityImage;
  founder?: {
    name?: string;
    role?: string;
    title?: string;
    bio?: string;
    image?: SanityImage;
  };
};

function mapSiteSettings(
  data: SanitySiteSettings,
  options?: { useSanityContactFields?: boolean }
): SiteConfig {
  const fallback = staticSiteConfig;
  const useSanityContact = options?.useSanityContactFields ?? false;

  return {
    businessName: data.businessName || fallback.businessName,
    tagline: data.tagline || fallback.tagline,
    description: data.description || fallback.description,
    descriptionCta: data.descriptionCta || fallback.descriptionCta,
    email: useSanityContact
      ? {
          business: data.email?.business?.trim() ?? "",
          personal: data.email?.personal?.trim() ?? "",
        }
      : {
          business: data.email?.business?.trim() || fallback.email.business,
          personal: data.email?.personal?.trim() || fallback.email.personal,
        },
    phone: useSanityContact
      ? data.phone?.trim() || ""
      : data.phone || fallback.phone,
    whatsapp: useSanityContact
      ? (data.whatsapp || data.phone)?.trim() || ""
      : data.whatsapp || data.phone || fallback.whatsapp,
    location: data.location || fallback.location,
    social: {
      github: data.social?.github || fallback.social.github,
      linkedin: data.social?.linkedin || fallback.social.linkedin,
      twitter: data.social?.twitter || fallback.social.twitter,
    },
    images: {
      logo: imageUrl(data.logo, fallback.images.logo),
      hero: imageUrl(data.heroImage, fallback.images.hero),
      team: imageUrl(data.teamImage, fallback.images.team),
      workspace: imageUrl(data.workspaceImage, fallback.images.workspace),
      office: imageUrl(data.officeImage, fallback.images.office),
    },
    founder: {
      name: data.founder?.name || fallback.founder.name,
      role: data.founder?.role || fallback.founder.role,
      title: data.founder?.title || fallback.founder.title,
      bio: data.founder?.bio || fallback.founder.bio,
      image: imageUrl(data.founder?.image, fallback.founder.image),
    },
  };
}

export const getContent = cache(async (): Promise<SiteContent> => {
  if (!isSanityConfigured || !sanityClient) {
    return staticContent;
  }

  try {
    const [settings, services, projects, stats] = await Promise.all([
      sanityClient.fetch<SanitySiteSettings | null>(siteSettingsQuery),
      sanityClient.fetch<
        Array<{
          _id: string;
          icon?: string;
          title?: string;
          description?: string;
        }>
      >(servicesQuery),
      sanityClient.fetch<
        Array<{
          _id: string;
          title?: string;
          description?: string;
          image?: SanityImage;
          tags?: string[];
          category?: Project["category"];
          liveUrl?: string;
          githubUrl?: string;
          featured?: boolean;
        }>
      >(projectsQuery),
      sanityClient.fetch<Array<{ value?: string; label?: string }>>(statsQuery),
    ]);

    if (!settings) {
      return staticContent;
    }

    const mappedProjects: Project[] =
      projects.length > 0
        ? projects.map((item, index) => ({
            id: item._id || String(index),
            title: item.title || "Untitled Project",
            description: item.description || "",
            image:
              imageUrl(
                item.image,
                staticProjects[index]?.image || "/projects/ecommerce.svg"
              ) || "/projects/ecommerce.svg",
            tags: item.tags || [],
            category: item.category || "web",
            liveUrl: item.liveUrl || undefined,
            githubUrl: item.githubUrl || undefined,
            featured: Boolean(item.featured),
          }))
        : staticContent.projects;

    const mappedServices: Service[] =
      services.length > 0
        ? services.map((item) => ({
            icon: (item.icon as ServiceIcon) || "Code2",
            title: item.title || "",
            description: item.description || "",
          }))
        : staticContent.services;

    const mappedStats: Stat[] =
      stats.length > 0
        ? stats.map((item) => ({
            value: item.value || "",
            label: item.label || "",
          }))
        : staticContent.stats;

    return {
      siteConfig: mapSiteSettings(settings, { useSanityContactFields: true }),
      services: mappedServices,
      projects: mappedProjects,
      stats: mappedStats,
    };
  } catch (error) {
    console.error("Failed to fetch Sanity content:", error);
    return staticContent;
  }
});

export async function getSiteConfig(): Promise<SiteConfig> {
  const { siteConfig } = await getContent();
  return siteConfig;
}
