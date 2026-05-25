import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { env } from "../lib/env.js";

export const adminRouter = Router();

adminRouter.use((req, res, next) => {
  const token = req.get("x-admin-key");
  if (!env.ADMIN_API_KEY || token !== env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

const projectSchema = z.object({
  slug: z.string().min(2).max(120),
  title: z.string().min(2).max(180),
  description: z.string().min(12),
  category: z.string().min(2).max(80),
  stack: z.array(z.string()).default([]),
  personas: z.array(z.string()).default([]),
  image: z.string().url(),
  liveUrl: z.string().url().optional().or(z.literal("")),
  sourceUrl: z.string().url().optional().or(z.literal("")),
  featured: z.boolean().default(false),
  sortOrder: z.number().int().default(0),
});

adminRouter.get("/messages", async (_req, res, next) => {
  try {
    const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 100 });
    res.json({ data: messages });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/projects", async (req, res, next) => {
  try {
    const data = projectSchema.parse(req.body);
    const project = await prisma.project.upsert({
      where: { slug: data.slug },
      update: data,
      create: data,
    });
    res.status(201).json({ data: project });
  } catch (error) {
    next(error);
  }
});

adminRouter.delete("/projects/:slug", async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { slug: req.params.slug } });
    res.status(204).send();
  } catch (error) {
    next(error);
  }
});
