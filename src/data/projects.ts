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

export const projects: Project[] = [
  {
    id: "1",
    title: "E-Commerce Platform",
    description:
      "A full-featured online store with real-time inventory, secure payments via Stripe, and an admin dashboard for order management.",
    image: "/projects/ecommerce.svg",
    tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
    category: "fullstack",
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
