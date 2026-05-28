import type { Project, ProjectCategory } from "@/types/content";

export type { Project };

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, secure payments via Stripe, and an admin dashboard for order management.",
    image: "/projects/ecommerce.svg",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    category: "fullstack",
    categoryLabel: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: "2",
    title: "Healthcare Dashboard",
    description:
      "Patient management system with appointment scheduling, medical records, and analytics for healthcare providers.",
    image: "/projects/healthcare.svg",
    tags: ["React", "Node.js", "MongoDB", "Chart.js"],
    category: "web",
    categoryLabel: "Web Apps",
    liveUrl: "#",
    featured: true,
  },
  {
    id: "3",
    title: "FinTech Mobile App",
    description:
      "Personal finance tracker with budget planning, expense categorization, and investment portfolio monitoring.",
    image: "/projects/fintech.svg",
    tags: ["React Native", "Firebase", "Plaid API"],
    category: "mobile",
    categoryLabel: "Mobile",
    liveUrl: "#",
    featured: true,
  },
  {
    id: "4",
    title: "Real Estate Portal",
    description:
      "Property listing platform with advanced search filters, virtual tours, and agent management tools.",
    image: "/projects/realestate.svg",
    tags: ["Vue.js", "Express", "PostgreSQL", "Mapbox"],
    category: "web",
    categoryLabel: "Web Apps",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: "5",
    title: "SaaS Analytics Tool",
    description:
      "Business intelligence dashboard with custom reports, data visualization, and team collaboration features.",
    image: "/projects/analytics.svg",
    tags: ["Next.js", "Python", "Redis", "D3.js"],
    category: "fullstack",
    categoryLabel: "Full Stack",
    liveUrl: "#",
    featured: false,
  },
  {
    id: "6",
    title: "Restaurant Ordering System",
    description:
      "QR-code based ordering system with kitchen display, table management, and real-time order tracking.",
    image: "/projects/restaurant.svg",
    tags: ["React", "Socket.io", "Node.js", "MySQL"],
    category: "fullstack",
    categoryLabel: "Full Stack",
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
];

export const categories = [
  { id: "all", label: "All Projects" },
  { id: "web", label: "Web Apps" },
  { id: "mobile", label: "Mobile" },
  { id: "fullstack", label: "Full Stack" },
  { id: "design", label: "Design" },
];

export const projectCategories: ProjectCategory[] = categories.filter(
  (category) => category.id !== "all"
);
