export type SectionIntro = {
  eyebrow: string;
  heading: string;
  headingHighlight: string;
  description: string;
};

export type AboutSection = SectionIntro & {
  paragraph2: string;
  highlights: string[];
};

export type PageSections = {
  about: AboutSection;
  services: SectionIntro;
  projects: SectionIntro;
  contact: SectionIntro;
};

export const pageSections: PageSections = {
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
};
