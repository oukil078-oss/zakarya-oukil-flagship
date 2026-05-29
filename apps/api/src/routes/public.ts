import { Router } from "express";
import { z } from "zod";
import { appwrite } from "../lib/appwrite.js";
import { hashIp } from "../lib/hash.js";
import { apiPersonas, apiProjects, apiTestimonials } from "../lib/static-content.js";

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

publicRouter.get("/projects", (_req, res) => {
  res.json({ data: apiProjects });
});

publicRouter.get("/testimonials", (_req, res) => {
  res.json({ data: apiTestimonials });
});

publicRouter.get("/personas", (_req, res) => {
  res.json({ data: apiPersonas });
});

publicRouter.post("/contact", async (req, res, next) => {
  try {
    const parsed = contactSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Please check the form fields.", issues: parsed.error.flatten().fieldErrors });
    }

    const created = await appwrite.databases.createDocument({
      databaseId: appwrite.databaseId,
      collectionId: appwrite.contactCollectionId,
      documentId: appwrite.ID.unique(),
      data: {
        ...parsed.data,
        ipHash: hashIp(req.ip) ?? "",
        userAgent: req.get("user-agent") ?? "",
        status: "new",
        createdAt: new Date().toISOString(),
      },
    });

    return res.status(201).json({ message: "Message received.", data: { id: created.$id, createdAt: created.$createdAt } });
  } catch (error) {
    next(error);
  }
});

publicRouter.post("/newsletter", async (req, res, next) => {
  try {
    const parsed = newsletterSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message: "Invalid email address." });

    const existing = await appwrite.databases.listDocuments({
      databaseId: appwrite.databaseId,
      collectionId: appwrite.newsletterCollectionId,
      queries: [appwrite.Query.equal("email", parsed.data.email), appwrite.Query.limit(1)],
    });

    if (existing.total > 0) {
      return res.status(200).json({ message: "Already subscribed.", data: { id: existing.documents[0].$id, email: parsed.data.email } });
    }

    const subscriber = await appwrite.databases.createDocument({
      databaseId: appwrite.databaseId,
      collectionId: appwrite.newsletterCollectionId,
      documentId: appwrite.ID.unique(),
      data: {
        email: parsed.data.email,
        source: parsed.data.source ?? "portfolio",
        createdAt: new Date().toISOString(),
      },
    });

    res.status(201).json({ message: "Subscribed.", data: { id: subscriber.$id, email: parsed.data.email } });
  } catch (error) {
    next(error);
  }
});
