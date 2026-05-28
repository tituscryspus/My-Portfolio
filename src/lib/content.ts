import { cache } from "react";
import { siteConfig as staticSiteConfig, services as staticServices, stats as staticStats } from "@/data/site";
import { pageSections as staticSections, type AboutSection, type PageSections, type SectionIntro } from "@/data/sections";
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
  sections: staticSections,
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

function mergeSectionIntro(
  data: Partial<SectionIntro> | null | undefined,
  fallback: SectionIntro
): SectionIntro {
  return {
    eyebrow: data?.eyebrow?.trim() || fallback.eyebrow,
    heading: data?.heading?.trim() || fallback.heading,
    headingHighlight: data?.headingHighlight?.trim() || fallback.headingHighlight,
    description: data?.description?.trim() || fallback.description,
  };
}

function mergeAboutSection(
  data: Partial<AboutSection> | null | undefined,
  fallback: AboutSection
): AboutSection {
  const intro = mergeSectionIntro(data, fallback);
  const highlights =
    data?.highlights?.map((item) => item?.trim()).filter((item): item is string => Boolean(item)) ??
    [];
  return {
    ...intro,
    paragraph2: data?.paragraph2?.trim() || fallback.paragraph2,
    highlights: highlights.length > 0 ? highlights : fallback.highlights,
  };
}

function mergePageSections(
  data: {
    about?: Partial<AboutSection> | null;
    services?: Partial<SectionIntro> | null;
    projects?: Partial<SectionIntro> | null;
    contact?: Partial<SectionIntro> | null;
  } | null | undefined
): PageSections {
  return {
    about: mergeAboutSection(data?.about, staticSections.about),
    services: mergeSectionIntro(data?.services, staticSections.services),
    projects: mergeSectionIntro(data?.projects, staticSections.projects),
    contact: mergeSectionIntro(data?.contact, staticSections.contact),
  };
}

type SanitySiteSettings = {
  businessName?: string;
  tagline?: string;
  description?: string;
  descriptionCta?: string;
  sections?: {
    about?: Partial<AboutSection> | null;
    services?: Partial<SectionIntro> | null;
    projects?: Partial<SectionIntro> | null;
    contact?: Partial<SectionIntro> | null;
  } | null;
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

function isUsableService(
  item: { title?: string; description?: string } | null | undefined
): boolean {
  return Boolean(item?.title?.trim() && item?.description?.trim());
}

function isUsableProject(
  item: { title?: string; description?: string } | null | undefined
): boolean {
  return Boolean(item?.title?.trim() && item?.description?.trim());
}

function isUsableStat(item: { value?: string; label?: string } | null | undefined): boolean {
  return Boolean(item?.value?.trim() && item?.label?.trim());
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

    const usableServices = (services ?? []).filter(isUsableService);
    const usableProjects = (projects ?? []).filter(isUsableProject);
    const usableStats = (stats ?? []).filter(isUsableStat);

    const mappedProjects: Project[] =
      usableProjects.length > 0
        ? usableProjects.map((item, index) => ({
            id: item._id || String(index),
            title: item.title!.trim(),
            description: item.description!.trim(),
            image:
              imageUrl(
                item.image,
                staticProjects[index]?.image || "/projects/ecommerce.svg"
              ) || "/projects/ecommerce.svg",
            tags: item.tags?.length ? item.tags : staticProjects[index]?.tags || [],
            category: item.category || staticProjects[index]?.category || "web",
            liveUrl: item.liveUrl || staticProjects[index]?.liveUrl || undefined,
            githubUrl: item.githubUrl || staticProjects[index]?.githubUrl || undefined,
            featured: item.featured ?? staticProjects[index]?.featured ?? false,
          }))
        : staticContent.projects;

    const mappedServices: Service[] =
      usableServices.length > 0
        ? usableServices.map((item, index) => ({
            icon: (item.icon as ServiceIcon) || staticServices[index]?.icon || "Code2",
            title: item.title!.trim(),
            description: item.description!.trim(),
          }))
        : staticContent.services;

    const mappedStats: Stat[] =
      usableStats.length > 0
        ? usableStats.map((item) => ({
            value: item.value!.trim(),
            label: item.label!.trim(),
          }))
        : staticContent.stats;

    if (!settings) {
      return {
        ...staticContent,
        services: mappedServices,
        projects: mappedProjects,
        stats: mappedStats,
      };
    }

    return {
      siteConfig: mapSiteSettings(settings, { useSanityContactFields: true }),
      sections: mergePageSections(settings.sections),
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
