import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { hashIp } from "../lib/hash.js";

export const publicRouter = Router();

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(160),
  subject: z.string().trim().min(3).max(180),
  type: z.string().trim().max(80).default("General"),
  message: z.string().trim().min(12).max(4000),
});

const newsletterSchema = z.object({
  email: z.string().trim().email().max(160),
  source: z.string().trim().max(80).optional(),
});

publicRouter.get("/projects", async (_req, res, next) => {
  try {
    const projects = await prisma.project.findMany({ orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }] });
    res.json({ data: projects });
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/testimonials", async (_req, res, next) => {
  try {
    const testimonials = await prisma.testimonial.findMany({ where: { featured: true }, orderBy: { createdAt: "desc" } });
    res.json({ data: testimonials });
  } catch (error) {
    next(error);
  }
});

publicRouter.get("/personas", async (_req, res, next) => {
  try {
    const personas = await prisma.personaConfig.findMany({ orderBy: { label: "asc" } });
    res.json({ data: personas });
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/contact", async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors });
    }
    const created = await prisma.contactMessage.create({
      data: {
        ...parsed.data,
        ipHash: hashIp(req.ip),
        userAgent: req.get("user-agent"),
      },
      select: { id: true, createdAt: true },
    });
    return res.status(201).json({ message: "Message received.", data: created });
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/newsletter", async (req, res, next) => {
  try {
    const parsed = newsletterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid email address." });
    const subscriber = await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: { source: parsed.data.source },
      create: parsed.data,
      select: { id: true, email: true, createdAt: true },
    });
    res.status(201).json({ message: "Subscribed.", data: subscriber });
  } catch (error) {
    next(error);
  }
});
