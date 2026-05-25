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

// PERSONAL PORTRAIT: replace this single local image at public/images/portraits/zakarya-oukil.jpeg if needed.
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
    photo: "/images/portraits/zakarya-oukil.jpeg",
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
    photo: "/images/portraits/zakarya-oukil.jpeg",
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
    photo: "/images/portraits/zakarya-oukil.jpeg",
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
    slug: "z-shop-ecommerce",
    title: "Z-Shop — Nike Shoes E-Commerce",
    category: "Developer",
    personas: ["dev", "ux", "graphic"],
    description: "A polished Nike-inspired e-commerce storefront with product browsing, strong visual hierarchy and conversion-focused shopping interactions.",
    stack: ["React", "E-Commerce", "Responsive UI", "Netlify"],
    image: "https://i.ibb.co/hJLshyRw/images.webp",
    live: "https://z-shopping.netlify.app/",
    source: "https://github.com/Oukil00/z-shop",
    highlight: "Premium commerce interface",
  },
  {
    slug: "medibook-web-platform",
    title: "Medibook — Healthcare Web Platform",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "A healthcare booking web platform designed around trust, clarity and fast access to medical services through a clean responsive interface.",
    stack: ["React", "Healthcare UX", "Landing Page", "Responsive UI"],
    image: "https://i.ibb.co/8nCzmbC2/medibookpc-9916bf2309d60f5cae0d.png",
    live: "https://medibooking.netlify.app/",
    source: "#contact",
    highlight: "Human-centered health platform",
  },
  {
    slug: "z-budget-tracker",
    title: "Z-Budget — Personal Budget Tracker",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "A personal finance tracker focused on quick budget visibility, clear spending feedback and a practical dashboard experience.",
    stack: ["React", "Finance UI", "State Management", "Netlify"],
    image: "https://i.ibb.co/dsk0bwxn/images-1.webp",
    live: "https://z-budget.netlify.app/",
    source: "https://github.com/Oukil00/Z-Budget",
    highlight: "Clean financial dashboard UX",
  },
  {
    slug: "z-weather-app",
    title: "Z-Weather — Weather App",
    category: "Developer",
    personas: ["dev", "graphic"],
    description: "A responsive weather application with atmospheric visual treatment, API-driven data and clear forecast presentation.",
    stack: ["React", "Weather API", "CSS", "Responsive UI"],
    image: "https://i.ibb.co/1tHszhCT/images-2.webp",
    live: "https://z-weather-project.netlify.app/",
    source: "https://github.com/Oukil00/Z-Weather",
    highlight: "Atmospheric data experience",
  },
  {
    slug: "za-kreative-games",
    title: "Za_kreative Games — Games Library",
    category: "Developer",
    personas: ["dev", "graphic"],
    description: "A games library web experience with bold browsing patterns, playful content structure and a visually memorable entertainment feel.",
    stack: ["React", "Games UI", "Library", "Netlify"],
    image: "https://i.ibb.co/60F1y85R/images-3.webp",
    live: "https://za-kreative-games.netlify.app/",
    source: "https://github.com/Oukil00/Za-Kreative-Games",
    highlight: "Entertainment browsing system",
  },
  {
    slug: "attendix-web-app",
    title: "Attendix — HR Management Web App",
    category: "Developer",
    personas: ["dev", "ux"],
    description: "An HR management web application for attendance workflows, workforce visibility and structured administrative operations.",
    stack: ["Web App", "HR Management", "Firebase", "Dashboard UX"],
    image: "https://i.ibb.co/93ZwpMwt/attendixpc-af52be18456373a4c987.png",
    live: "https://attendix-grh.web.app/",
    source: "#contact",
    highlight: "Operational HR dashboard",
  },
  {
    slug: "attendix-mobile-ui",
    title: "Attendix Mobile App — HR Management",
    category: "UI/UX Designer",
    personas: ["ux", "dev"],
    description: "A mobile HR management interface with clean employee flows, attendance clarity and a modern product design system.",
    stack: ["Figma", "Mobile UX", "HR Product", "Design System"],
    image: "https://i.ibb.co/60h1SGzP/attendixbg-070e3ba3a6701a7b6cb1.png",
    live: "https://dribbble.com/shots/24799533-Attendix-Hr-Management-App-Ui",
    source: "#contact",
    highlight: "Mobile HR product design",
  },
  {
    slug: "medibook-mobile-ui",
    title: "Medibook Mobile App — Healthcare",
    category: "UI/UX Designer",
    personas: ["ux", "graphic"],
    description: "A healthcare mobile app concept focused on approachable booking flows, medical trust signals and polished mobile UI details.",
    stack: ["Figma", "Healthcare UX", "Mobile App", "Prototype"],
    image: "https://i.ibb.co/NgzT6fGc/medibookbg-87c1e21237582121dad5.png",
    live: "https://dribbble.com/shots/24799516-Medibook-UI-UX-and-Web-Design-Landing-Page",
    source: "#contact",
    highlight: "Healthcare mobile experience",
  },
  {
    slug: "pitchpal-ai-chatbot",
    title: "PitchPal — AI Chatbot for Entrepreneurs",
    category: "UI/UX Designer",
    personas: ["ux", "dev", "graphic"],
    description: "An AI chatbot product concept for entrepreneurs, designed to make pitching, ideation and startup guidance feel fast and accessible.",
    stack: ["Figma", "AI Product", "Chatbot UX", "Prototype"],
    image: "https://i.ibb.co/G4SHGGHP/Pitch-Pal-782734278a87b586854f.png",
    live: "https://dribbble.com/shots/24798655-PitchPal-AI-Chatbot-for-Entrepreneurs",
    source: "#contact",
    highlight: "AI product storytelling",
  },
  {
    slug: "unifood-delivery-ui",
    title: "UniFood — FastFood Delivery App",
    category: "UI/UX Designer",
    personas: ["ux", "graphic"],
    description: "A fast-food delivery mobile app with energetic visuals, simple ordering flows and a crisp consumer-product interface.",
    stack: ["Figma", "Food Delivery", "Mobile UX", "Visual UI"],
    image: "https://i.ibb.co/m3Dykzt/unifoodbg-0187e05be7bdc39de1c3.png",
    live: "https://dribbble.com/shots/24818353-UI-UX-Design-for-a-FastFood-Delivery-Mobile-App",
    source: "#contact",
    highlight: "Consumer mobile app design",
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
