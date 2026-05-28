/**
 * Seeds your Sanity project with current site content.
 *
 * 1. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local
 * 2. Run: npm run sanity:seed
 */
import { createClient } from "@sanity/client";
import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

function loadEnv() {
  try {
    const envPath = join(root, ".env.local");
    const content = readFileSync(envPath, "utf8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const [key, ...rest] = trimmed.split("=");
      if (key && rest.length) {
        process.env[key.trim()] = rest.join("=").trim().replace(/^["']|["']$/g, "");
      }
    }
  } catch {
    console.error("Could not read .env.local — add your Sanity project ID and API token first.");
    process.exit(1);
  }
}

loadEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!projectId || !token) {
  console.error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_TOKEN in .env.local");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false,
});

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  businessName: "Tkryce Tech Solutions",
  tagline: "Innovative Technology Solutions for Modern Businesses",
  description:
    "Tkryce Tech Solutions delivers cutting-edge software development, web applications, and digital transformation services. Founded by Computer Scientist Lukaye Titus Cryspus.",
  descriptionCta: "Partner with us to build the future.",
  sections: {
    about: {
      eyebrow: "About Us",
      heading: "Technology Partners You Can",
      headingHighlight: "Trust",
      description:
        "Tkryce Tech Solutions is a forward-thinking technology company founded by Lukaye Titus Cryspus, a Computer Scientist specializing in custom software development, digital products, and IT consulting. We combine technical excellence with business insight to deliver solutions that make a real impact.",
      paragraph2:
        "From startups to enterprises, we help organizations navigate their digital transformation journeys with confidence — backed by computer science expertise and real-world engineering experience.",
      highlights: [
        "End-to-end project delivery from concept to launch",
        "Agile methodology with transparent communication",
        "Scalable solutions built for long-term growth",
        "Dedicated support and maintenance packages",
      ],
    },
    services: {
      eyebrow: "Our Services",
      heading: "Solutions Tailored to",
      headingHighlight: "Your Needs",
      description:
        "From concept to deployment, we offer comprehensive technology services to help your business thrive in the digital age.",
    },
    projects: {
      eyebrow: "Portfolio",
      heading: "Projects We've",
      headingHighlight: "Built",
      description:
        "Explore our latest work — from startups to enterprise solutions, each project crafted with precision and passion.",
    },
    contact: {
      eyebrow: "Contact",
      heading: "Let's Build Something",
      headingHighlight: "Great",
      description:
        "Whether you need a business partner or want to connect personally, we'd love to hear from you.",
    },
  },
  email: {
    business: "hello@tkrycetechnsolutions.com",
    personal: "lukaye.cryspus@tkrycetechnsolutions.com",
  },
  phone: "+1 (555) 000-0000",
  whatsapp: "+1 (555) 000-0000",
  location: "Available Worldwide · Remote First",
  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    twitter: "https://twitter.com",
  },
  founder: {
    name: "Lukaye Titus Cryspus",
    role: "Founder & Computer Scientist",
    title: "Computer Scientist",
    bio: "I am a Computer Scientist and the founder of Tkryce Tech Solutions. With a deep passion for technology and problem-solving, I specialize in building scalable web applications, mobile solutions, and enterprise software that help businesses grow and innovate in the digital age.",
  },
};

const projectCategories = [
  {
    _id: "category-web",
    _type: "projectCategory",
    title: "Web Apps",
    slug: { _type: "slug", current: "web" },
    order: 0,
  },
  {
    _id: "category-mobile",
    _type: "projectCategory",
    title: "Mobile",
    slug: { _type: "slug", current: "mobile" },
    order: 1,
  },
  {
    _id: "category-fullstack",
    _type: "projectCategory",
    title: "Full Stack",
    slug: { _type: "slug", current: "fullstack" },
    order: 2,
  },
  {
    _id: "category-design",
    _type: "projectCategory",
    title: "Design",
    slug: { _type: "slug", current: "design" },
    order: 3,
  },
];

const categoryRef = (id) => ({
  _type: "reference",
  _ref: id,
});

const technologyNames = [
  "Next.js",
  "Stripe",
  "PostgreSQL",
  "Tailwind",
  "React",
  "Node.js",
  "MongoDB",
  "Chart.js",
  "React Native",
  "Firebase",
  "Plaid API",
  "Vue.js",
  "Express",
  "Mapbox",
  "Python",
  "Redis",
  "D3.js",
  "Socket.io",
  "MySQL",
];

const techId = (name) =>
  `tech-${name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}`;

const technologies = technologyNames.map((name, order) => ({
  _id: techId(name),
  _type: "technology",
  name,
  order,
}));

const techRef = (name) => ({
  _type: "reference",
  _ref: techId(name),
});

const tagRefs = (names) => names.map((name) => techRef(name));

const services = [
  {
    _id: "service-web-development",
    icon: "Code2",
    title: "Web Development",
    order: 0,
    description:
      "Custom websites and web applications built with modern frameworks like React, Next.js, and Node.js for blazing-fast performance.",
  },
  {
    _id: "service-mobile-solutions",
    icon: "Smartphone",
    title: "Mobile Solutions",
    order: 1,
    description:
      "Cross-platform mobile apps that deliver seamless experiences on iOS and Android using React Native and Flutter.",
  },
  {
    _id: "service-cloud-devops",
    icon: "Cloud",
    title: "Cloud & DevOps",
    order: 2,
    description:
      "Scalable cloud infrastructure, CI/CD pipelines, and deployment strategies on AWS, Azure, and Google Cloud.",
  },
  {
    _id: "service-ui-ux-design",
    icon: "Palette",
    title: "UI/UX Design",
    order: 3,
    description:
      "User-centered design that combines aesthetics with functionality to create intuitive digital experiences.",
  },
  {
    _id: "service-backend-systems",
    icon: "Database",
    title: "Backend Systems",
    order: 4,
    description:
      "Robust APIs, database architecture, and microservices that power your applications reliably at scale.",
  },
  {
    _id: "service-consulting",
    icon: "Shield",
    title: "Consulting",
    order: 5,
    description:
      "Technology strategy, code audits, and digital transformation guidance to align tech with business goals.",
  },
];

const projects = [
  {
    _id: "project-ecommerce-platform",
    title: "E-Commerce Platform",
    order: 0,
    category: categoryRef("category-fullstack"),
    featured: true,
    tags: tagRefs(["Next.js", "Stripe", "PostgreSQL", "Tailwind"]),
    description:
      "A full-featured online store with real-time inventory, secure payments via Stripe, and an admin dashboard for order management.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    _id: "project-healthcare-dashboard",
    title: "Healthcare Dashboard",
    order: 1,
    category: categoryRef("category-web"),
    featured: true,
    tags: tagRefs(["React", "Node.js", "MongoDB", "Chart.js"]),
    description:
      "Patient management system with appointment scheduling, medical records, and analytics for healthcare providers.",
    liveUrl: "#",
  },
  {
    _id: "project-fintech-mobile-app",
    title: "FinTech Mobile App",
    order: 2,
    category: categoryRef("category-mobile"),
    featured: true,
    tags: tagRefs(["React Native", "Firebase", "Plaid API"]),
    description:
      "Personal finance tracker with budget planning, expense categorization, and investment portfolio monitoring.",
    liveUrl: "#",
  },
  {
    _id: "project-real-estate-portal",
    title: "Real Estate Portal",
    order: 3,
    category: categoryRef("category-web"),
    featured: false,
    tags: tagRefs(["Vue.js", "Express", "PostgreSQL", "Mapbox"]),
    description:
      "Property listing platform with advanced search filters, virtual tours, and agent management tools.",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    _id: "project-saas-analytics-tool",
    title: "SaaS Analytics Tool",
    order: 4,
    category: categoryRef("category-fullstack"),
    featured: false,
    tags: tagRefs(["Next.js", "Python", "Redis", "D3.js"]),
    description:
      "Business intelligence dashboard with custom reports, data visualization, and team collaboration features.",
    liveUrl: "#",
  },
  {
    _id: "project-restaurant-ordering-system",
    title: "Restaurant Ordering System",
    order: 5,
    category: categoryRef("category-fullstack"),
    featured: false,
    tags: tagRefs(["React", "Socket.io", "Node.js", "MySQL"]),
    description:
      "QR-code based ordering system with kitchen display, table management, and real-time order tracking.",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const stats = [
  { _id: "stat-projects-delivered", value: "50+", label: "Projects Delivered", order: 0 },
  { _id: "stat-happy-clients", value: "30+", label: "Happy Clients", order: 1 },
  { _id: "stat-years-experience", value: "5+", label: "Years Experience", order: 2 },
  { _id: "stat-client-satisfaction", value: "99%", label: "Client Satisfaction", order: 3 },
];

async function seed() {
  console.log("Seeding Sanity dataset:", dataset);

  await client.createOrReplace(siteSettings);
  console.log("✓ Site settings (including page section copy)");

  for (const item of services) {
    await client.createOrReplace({ _type: "service", ...item });
  }
  console.log(`✓ ${services.length} services`);

  for (const item of projectCategories) {
    await client.createOrReplace(item);
  }
  console.log(`✓ ${projectCategories.length} project categories`);

  for (const item of technologies) {
    await client.createOrReplace(item);
  }
  console.log(`✓ ${technologies.length} technologies`);

  for (const item of projects) {
    await client.createOrReplace({ _type: "project", ...item });
  }
  console.log(`✓ ${projects.length} projects`);

  for (const item of stats) {
    await client.createOrReplace({ _type: "stat", ...item });
  }
  console.log(`✓ ${stats.length} statistics`);

  console.log("\nDone! In /studio you can:");
  console.log("  • Technologies — add tools/skills (Next.js, Figma, etc.)");
  console.log("  • Project Categories — add/rename/delete filter tabs");
  console.log("  • Projects — link technologies; pick or create categories");
  console.log("  • Site Settings → Page Sections — edit section headings");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
