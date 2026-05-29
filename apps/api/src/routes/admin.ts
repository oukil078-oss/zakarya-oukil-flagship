import { Router } from "express";
import { appwrite } from "../lib/appwrite.js";
import { env } from "../lib/env.js";

export const adminRouter = Router();

adminRouter.use((req, res, next) => {
  const token = req.get("x-admin-key");
  if (!env.ADMIN_API_KEY || token !== env.ADMIN_API_KEY) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
});

adminRouter.get("/messages", async (_req, res, next) => {
  try {
    const messages = await appwrite.databases.listDocuments({
      databaseId: appwrite.databaseId,
      collectionId: appwrite.contactCollectionId,
      queries: [appwrite.Query.orderDesc("createdAt"), appwrite.Query.limit(100)],
    });
    res.json({ data: messages.documents, total: messages.total });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/projects", (_req, res) => {
  res.status(501).json({ message: "Project content is currently managed from the frontend content file." });
});

adminRouter.delete("/projects/:slug", (_req, res) => {
  res.status(501).json({ message: "Project content is currently managed from the frontend content file." });
});
