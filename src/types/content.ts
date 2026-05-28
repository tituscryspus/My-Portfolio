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
  category: "web" | "mobile" | "fullstack" | "design";
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Stat {
  value: string;
  label: string;
}

export interface SectionIntro {
  eyebrow: string;
  title: string;
  titleHighlight: string;
  description: string;
  pageTitle: string;
  pageDescription: string;
}

export interface AboutSection extends SectionIntro {
  description2: string;
  highlights: string[];
}

export interface ProjectCategory {
  id: string;
  label: string;
}

export interface ProjectsSection extends SectionIntro {
  projectFilters: ProjectCategory[];
}

export interface PageSections {
  about: AboutSection;
  services: SectionIntro;
  projects: ProjectsSection;
  contact: SectionIntro;
}

export interface SiteContent {
  siteConfig: SiteConfig;
  pageSections: PageSections;
  services: Service[];
  projects: Project[];
  stats: Stat[];
}
