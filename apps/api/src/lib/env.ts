import { config } from "dotenv";
import { z } from "zod";

config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  FRONTEND_ORIGIN: z.string().default("http://localhost:3000"),
  ADMIN_API_KEY: z.string().optional(),
  APPWRITE_ENDPOINT: z.string().url().default("https://cloud.appwrite.io/v1"),
  APPWRITE_PROJECT_ID: z.string().min(1),
  APPWRITE_API_KEY: z.string().min(1),
  APPWRITE_DATABASE_ID: z.string().default("portfolio"),
  APPWRITE_CONTACT_COLLECTION_ID: z.string().default("contact_messages"),
  APPWRITE_NEWSLETTER_COLLECTION_ID: z.string().default("newsletter_subscribers"),
});

export const env = envSchema.parse(process.env);
