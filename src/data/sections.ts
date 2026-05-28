import { categories as defaultProjectCategories } from "@/data/projects";
import type { PageSections, ProjectCategory } from "@/types/content";

export const defaultPageSections: PageSections = {
  about: {
    eyebrow: "About Us",
    title: "Technology Partners You Can",
    titleHighlight: "Trust",
    description:
      "Tkryce Tech Solutions is a forward-thinking technology company founded by Lukaye Titus Cryspus, a Computer Scientist specializing in custom software development, digital products, and IT consulting. We combine technical excellence with business insight to deliver solutions that make a real impact.",
    description2:
      "From startups to enterprises, we help organizations navigate their digital transformation journeys with confidence — backed by computer science expertise and real-world engineering experience.",
    highlights: [
      "End-to-end project delivery from concept to launch",
      "Agile methodology with transparent communication",
      "Scalable solutions built for long-term growth",
      "Dedicated support and maintenance packages",
    ],
    pageTitle: "About Us",
    pageDescription:
      "Meet Lukaye Titus Cryspus and learn about Tkryce Tech Solutions.",
  },
  services: {
    eyebrow: "Our Services",
    title: "Solutions Tailored to",
    titleHighlight: "Your Needs",
    description:
      "From concept to deployment, we offer comprehensive technology services to help your business thrive in the digital age.",
    pageTitle: "Our Services",
    pageDescription:
      "Comprehensive technology solutions tailored to your business needs.",
  },
  projects: {
    eyebrow: "Portfolio",
    title: "Projects We've",
    titleHighlight: "Built",
    description:
      "Explore our latest work — from startups to enterprise solutions, each project crafted with precision and passion.",
    pageTitle: "Our Projects",
    pageDescription:
      "Explore the digital products and solutions we've built for clients.",
    projectFilters: defaultProjectCategories,
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's Build Something",
    titleHighlight: "Great",
    description:
      "Whether you need a business partner or want to connect personally, we'd love to hear from you.",
    pageTitle: "Contact Us",
    pageDescription:
      "Reach out for business inquiries or connect with Lukaye personally.",
  },
};

export const defaultProjectFilters: ProjectCategory[] =
  defaultPageSections.projects.projectFilters ?? defaultProjectCategories;
