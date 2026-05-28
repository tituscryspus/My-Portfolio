export type ServiceIcon =
  | "Code2"
  | "Smartphone"
  | "Cloud"
  | "Palette"
  | "Database"
  | "Shield";

export interface SiteConfig {
  businessName: string;
  tagline: string;
  description: string;
  descriptionCta: string;
  email: {
    business: string;
    personal: string;
  };
  phone: string;
  whatsapp: string;
  location: string;
  social: {
    github: string;
    linkedin: string;
    twitter: string;
  };
  images: {
    logo: string;
    hero: string;
    team: string;
    workspace: string;
    office: string;
  };
  founder: {
    name: string;
    role: string;
    title: string;
    bio: string;
    image: string;
  };
}

export interface Service {
  icon: ServiceIcon;
  title: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
  categoryLabel: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export type ProjectFilter = ProjectCategory;

export interface Stat {
  value: string;
  label: string;
}

export type { AboutSection, PageSections, SectionIntro } from "@/data/sections";

export interface SiteContent {
  siteConfig: SiteConfig;
  sections: import("@/data/sections").PageSections;
  services: Service[];
  projects: Project[];
  projectCategories: ProjectCategory[];
  stats: Stat[];
}
