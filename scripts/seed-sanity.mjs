/**
 * Seeds your Sanity project with current site content.
 *
 * 1. Copy .env.example to .env.local and fill in your Sanity project ID + token
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
    console.error("Could not read .env.local — copy .env.example to .env.local first.");
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

const services = [
  { icon: "Code2", title: "Web Development", order: 0, description: "Custom websites and web applications built with modern frameworks like React, Next.js, and Node.js for blazing-fast performance." },
  { icon: "Smartphone", title: "Mobile Solutions", order: 1, description: "Cross-platform mobile apps that deliver seamless experiences on iOS and Android using React Native and Flutter." },
  { icon: "Cloud", title: "Cloud & DevOps", order: 2, description: "Scalable cloud infrastructure, CI/CD pipelines, and deployment strategies on AWS, Azure, and Google Cloud." },
  { icon: "Palette", title: "UI/UX Design", order: 3, description: "User-centered design that combines aesthetics with functionality to create intuitive digital experiences." },
  { icon: "Database", title: "Backend Systems", order: 4, description: "Robust APIs, database architecture, and microservices that power your applications reliably at scale." },
  { icon: "Shield", title: "Consulting", order: 5, description: "Technology strategy, code audits, and digital transformation guidance to align tech with business goals." },
];

const projects = [
  { title: "E-Commerce Platform", order: 0, category: "fullstack", featured: true, tags: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"], description: "A full-featured online store with real-time inventory, secure payments via Stripe, and an admin dashboard for order management.", liveUrl: "#", githubUrl: "#" },
  { title: "Healthcare Dashboard", order: 1, category: "web", featured: true, tags: ["React", "Node.js", "MongoDB", "Chart.js"], description: "Patient management system with appointment scheduling, medical records, and analytics for healthcare providers.", liveUrl: "#" },
  { title: "FinTech Mobile App", order: 2, category: "mobile", featured: true, tags: ["React Native", "Firebase", "Plaid API"], description: "Personal finance tracker with budget planning, expense categorization, and investment portfolio monitoring.", liveUrl: "#" },
  { title: "Real Estate Portal", order: 3, category: "web", featured: false, tags: ["Vue.js", "Express", "PostgreSQL", "Mapbox"], description: "Property listing platform with advanced search filters, virtual tours, and agent management tools.", liveUrl: "#", githubUrl: "#" },
  { title: "SaaS Analytics Tool", order: 4, category: "fullstack", featured: false, tags: ["Next.js", "Python", "Redis", "D3.js"], description: "Business intelligence dashboard with custom reports, data visualization, and team collaboration features.", liveUrl: "#" },
  { title: "Restaurant Ordering System", order: 5, category: "fullstack", featured: false, tags: ["React", "Socket.io", "Node.js", "MySQL"], description: "QR-code based ordering system with kitchen display, table management, and real-time order tracking.", liveUrl: "#", githubUrl: "#" },
];

const stats = [
  { value: "50+", label: "Projects Delivered", order: 0 },
  { value: "30+", label: "Happy Clients", order: 1 },
  { value: "5+", label: "Years Experience", order: 2 },
  { value: "99%", label: "Client Satisfaction", order: 3 },
];

async function seed() {
  console.log("Seeding Sanity dataset:", dataset);

  await client.createOrReplace(siteSettings);
  console.log("✓ Site settings");

  for (const item of services) {
    await client.create({ _type: "service", ...item });
  }
  console.log(`✓ ${services.length} services`);

  for (const item of projects) {
    await client.create({ _type: "project", ...item });
  }
  console.log(`✓ ${projects.length} projects`);

  for (const item of stats) {
    await client.create({ _type: "stat", ...item });
  }
  console.log(`✓ ${stats.length} statistics`);

  console.log("\nDone! Open http://localhost:3000/studio to edit your content.");
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
