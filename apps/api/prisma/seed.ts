import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.project.upsert({
    where: { slug: "sentinel-ai-dashboard" },
    update: {},
    create: {
      slug: "sentinel-ai-dashboard",
      title: "Sentinel AI Security Dashboard",
      description: "Cybersecurity command center concept for anomaly triage and AI-assisted investigation.",
      category: "Developer",
      stack: ["Next.js", "TypeScript", "PostgreSQL", "AI UX"],
      personas: ["dev", "ux"],
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",
      featured: true,
      sortOrder: 1,
    },
  });

  for (const persona of [
    { key: "graphic", label: "Graphic Designer", accent: "#ff355d", accent2: "#ffb86b", description: "Visual storytelling, branding, posters, typography and composition.", stats: { branding: 94, typography: 91, composition: 96 } },
    { key: "ux", label: "UI/UX Designer", accent: "#53e3ff", accent2: "#8c7dff", description: "Product design, wireframing, user flows, dashboards and interaction polish.", stats: { research: 86, systems: 93, interaction: 89 } },
    { key: "dev", label: "Developer", accent: "#9dff57", accent2: "#38f8aa", description: "Full-stack engineering, APIs, databases, AI/cybersecurity projects and production architecture.", stats: { next: 90, backend: 84, databases: 80 } },
  ]) {
    await prisma.personaConfig.upsert({ where: { key: persona.key }, update: persona, create: persona });
  }
}

main().finally(async () => prisma.$disconnect());
