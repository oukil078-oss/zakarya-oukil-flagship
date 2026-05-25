import type { LucideIcon } from "lucide-react";
import { Brush, Code2, Cpu, Database, Figma, Layers3, LayoutDashboard, LockKeyhole, Palette, PenTool, ShieldCheck, Sparkles, Workflow } from "lucide-react";

export type PersonaId = "graphic" | "ux" | "dev";

export type Persona = {
  id: PersonaId;
  label: string;
  classCode: string;
  headline: string;
  summary: string;
  accent: string;
  accent2: string;
  rgb: string;
  rank: string;
  level: number;
  photo: string;
  mask: {
    title: string;
    subtitle: string;
    visor: string;
    geometry: "designer" | "ux" | "developer";
  };
  stats: { label: string; value: number; suffix?: string }[];
  loadout: { label: string; icon: LucideIcon }[];
  strengths: string[];
};

// PLACEHOLDER REMOTE IMAGES: replace these with Zakarya's actual photos in one place.
export const personas: Persona[] = [
  {
    id: "graphic",
    label: "Graphic Designer",
    classCode: "VISUAL / S-01",
    headline: "Visual systems with cinematic impact.",
    summary: "I craft brand visuals, posters, social assets and high-contrast compositions that make ideas feel premium, sharp and memorable.",
    accent: "#ff355d",
    accent2: "#ffb86b",
    rgb: "255 53 93",
    rank: "S",
    level: 86,
    photo: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=1000&q=85",
    mask: { title: "CHROMA HELM", subtitle: "Identity reveal", visor: "#ff355d", geometry: "designer" },
    stats: [
      { label: "Branding", value: 94 },
      { label: "Typography", value: 91 },
      { label: "Composition", value: 96 },
      { label: "Storytelling", value: 90 },
    ],
    loadout: [
      { label: "Brand worlds", icon: Palette },
      { label: "Poster systems", icon: PenTool },
      { label: "Creative direction", icon: Sparkles },
    ],
    strengths: ["Visual storytelling", "Brand identity", "Editorial composition", "Campaign artwork"],
  },
  {
    id: "ux",
    label: "UI/UX Designer",
    classCode: "PRODUCT / S-02",
    headline: "Interfaces engineered for clarity and delight.",
    summary: "I translate complex products into clean flows, design systems, dashboards and polished interactions that users understand instantly.",
    accent: "#53e3ff",
    accent2: "#8c7dff",
    rgb: "83 227 255",
    rank: "S",
    level: 91,
    photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1000&q=85",
    mask: { title: "FLOW VISOR", subtitle: "Usability layer", visor: "#53e3ff", geometry: "ux" },
    stats: [
      { label: "Research", value: 86 },
      { label: "Wireframes", value: 92 },
      { label: "Design System", value: 93 },
      { label: "Interaction", value: 89 },
    ],
    loadout: [
      { label: "User flows", icon: Workflow },
      { label: "Dashboards", icon: LayoutDashboard },
      { label: "Figma systems", icon: Figma },
    ],
    strengths: ["User journeys", "Design systems", "Prototype polish", "Product dashboards"],
  },
  {
    id: "dev",
    label: "Developer",
    classCode: "ENGINEER / S-03",
    headline: "Production-grade full-stack systems.",
    summary: "I build fast React/Next.js frontends, secure APIs, database-backed apps and AI/cybersecurity projects with clean architecture.",
    accent: "#9dff57",
    accent2: "#38f8aa",
    rgb: "157 255 87",
    rank: "S",
    level: 88,
    photo: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1000&q=85",
    mask: { title: "KERNEL MASK", subtitle: "Runtime core", visor: "#9dff57", geometry: "developer" },
    stats: [
      { label: "React / Next", value: 90 },
      { label: "Backend APIs", value: 84 },
      { label: "Databases", value: 80 },
      { label: "AI / Cybersec", value: 82 },
    ],
    loadout: [
      { label: "Next.js apps", icon: Code2 },
      { label: "Secure APIs", icon: ShieldCheck },
      { label: "PostgreSQL", icon: Database },
    ],
    strengths: ["Full-stack engineering", "API architecture", "AI tools", "Cybersecurity mindset"],
  },
];

export const socialLinks = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/zakaryaoukil/" },
  { label: "GitHub", href: "https://github.com/zakaryaoukil" },
  { label: "Behance", href: "https://www.behance.net/zakaryaoukil" },
  { label: "Instagram", href: "https://www.instagram.com/zako_o.o/" },
];

export const timeline = [
  {
    date: "2025 — Present",
    title: "AI, Cybersecurity & Product Engineering Track",
    company: "Independent / Academic Projects",
    body: "Building stronger foundations in secure systems, AI tooling, modern full-stack architecture and production-grade delivery.",
    tags: ["AI", "Cybersecurity", "Next.js", "PostgreSQL"],
  },
  {
    date: "2024 — Present",
    title: "Figma Mentor",
    company: "Design training & workshops",
    body: "Teaching UI/UX principles, Figma workflows, interface structure and professional design habits to students and young creators.",
    tags: ["Figma", "Mentorship", "Design Systems"],
  },
  {
    date: "2023 — 2024",
    title: "Design Department Lead",
    company: "Student / Creative Organization",
    body: "Led visual direction, managed design execution, mentored teammates and improved internal creative standards across campaigns.",
    tags: ["Leadership", "Branding", "Creative Direction"],
  },
  {
    date: "2022 — 2023",
    title: "Front-End Developer Intern",
    company: "Client & team projects",
    body: "Developed responsive web experiences, collaborated on implementation details and connected design precision with front-end code.",
    tags: ["React", "Tailwind", "Responsive UI"],
  },
];

export const projects = [
  {
    slug: "sentinel-ai-dashboard",
    title: "Sentinel AI Security Dashboard",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "A cybersecurity command center concept for anomaly triage, alert prioritization and AI-assisted investigation flows.",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "AI UX"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
    live: "#contact",
    source: "#contact",
    highlight: "Security-first product architecture",
  },
  {
    slug: "pitchpal-product-design",
    title: "PitchPal Product Prototype",
    category: "UI/UX Designer",
    personas: ["ux", "graphic"],
    description: "A polished pitch and collaboration product flow built around fast onboarding, clear screens and persuasive interaction details.",
    stack: ["Figma", "UX Flow", "Prototype", "Design System"],
    image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&w=1200&q=85",
    live: "https://www.figma.com/proto/sUDfj9z4a39b96QilCYO2q/PitchPal?page-id=0%3A1&node-id=2-89",
    source: "#contact",
    highlight: "Product storytelling and usability",
  },
  {
    slug: "healthcare-web-platform",
    title: "Healthcare Web Platform",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "Responsive healthcare experience with a clean conversion path, modern component structure and accessible interface patterns.",
    stack: ["React", "Vite", "Tailwind CSS", "Accessibility"],
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=85",
    live: "#projects",
    source: "#contact",
    highlight: "Human-centered health UI",
  },
  {
    slug: "event-brand-system",
    title: "Event Identity System",
    category: "Graphic Designer",
    personas: ["graphic"],
    description: "A high-energy visual identity kit with key art, poster direction, typography rules and reusable social media templates.",
    stack: ["Photoshop", "Illustrator", "Typography", "Branding"],
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=85",
    live: "#contact",
    source: "#contact",
    highlight: "Campaign-ready visual system",
  },
  {
    slug: "attendance-management-app",
    title: "Attendance Management App",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "A robust attendance interface for fast tracking, admin clarity and scalable future database integration.",
    stack: ["React", "Vite", "HTML5", "Tailwind CSS"],
    image: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1200&q=85",
    live: "#projects",
    source: "#contact",
    highlight: "Admin UX and app structure",
  },
  {
    slug: "weather-experience",
    title: "Weather Experience",
    category: "Developer",
    personas: ["dev", "graphic"],
    description: "A polished weather app concept using clean UI states, atmospheric visuals and responsive front-end implementation.",
    stack: ["React", "API", "CSS", "Motion"],
    image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=1200&q=85",
    live: "https://z-weather-project.netlify.app/",
    source: "#contact",
    highlight: "Atmospheric interface design",
  },
];

export const services = [
  { title: "Brand & Visual Identity", body: "Logos, posters, typography direction, campaign visuals and social systems with a premium editorial feel.", icon: Brush },
  { title: "UI/UX Product Design", body: "Research-informed screens, wireframes, user flows, design systems, dashboards and clickable prototypes.", icon: Layers3 },
  { title: "Full-Stack Web Apps", body: "Next.js and React experiences connected to secure APIs, PostgreSQL data models and deployment pipelines.", icon: Cpu },
  { title: "AI/Cybersec Concepts", body: "High-tech interfaces for security products, AI tools, dashboards and automation-heavy workflows.", icon: LockKeyhole },
];

export const testimonials = [
  { quote: "Zakarya combines visual taste with engineering discipline. He can turn a vague concept into something clear, sharp and usable.", name: "Project Collaborator", role: "Startup Product Lead", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=85" },
  { quote: "His Figma mentoring was practical and direct. The sessions helped students understand how professional interface systems are built.", name: "Workshop Organizer", role: "Design Community", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=85" },
  { quote: "He brings a rare mix: graphic design instincts, product thinking and front-end execution. The result feels polished from the first demo.", name: "Client Partner", role: "Creative Project", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85" },
];

export const certificates = [
  "Adobe Creative Educator Level 1-2",
  "Certifying Adobe Skills",
  "Design User Experiences with Figma",
  "Figma for UX Design",
];

export const toolbelt = [
  { name: "Figma", level: 94, group: "Design" },
  { name: "Adobe Suite", level: 90, group: "Design" },
  { name: "React / Next.js", level: 90, group: "Development" },
  { name: "TypeScript", level: 84, group: "Development" },
  { name: "Tailwind CSS", level: 92, group: "Development" },
  { name: "PostgreSQL", level: 78, group: "Backend" },
  { name: "API Design", level: 82, group: "Backend" },
  { name: "Cybersecurity", level: 76, group: "Security" },
  { name: "AI Prototyping", level: 80, group: "AI" },
  { name: "Motion UX", level: 84, group: "Design" },
];

export const profile = {
  name: "Zakarya Oukil",
  title: "Designer, Developer & High-Tech Creative",
  email: "zakaryaoukil2003@gmail.com",
  phone: "+213 668718784",
  location: "Baraki, Algiers, Algeria",
  bio: "I am Zakarya Oukil, a multidisciplinary designer and developer from Algiers. I started in graphic design, evolved into UI/UX and now engineer modern web experiences with a growing focus on AI and cybersecurity. My advantage is the bridge: I can shape the brand, design the product and build the system behind it.",
};

export const heroNumbers = [
  { label: "Years in design", value: 5, suffix: "+" },
  { label: "Years building web", value: 2, suffix: "+" },
  { label: "Core identities", value: 3 },
  { label: "Location", value: 213, prefix: "+" },
];
