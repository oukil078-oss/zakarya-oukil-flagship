import { Client, Databases, ID, Query } from "node-appwrite";
import { env } from "./env.js";

const client = new Client()
  .setEndpoint(env.APPWRITE_ENDPOINT)
  .setProject(env.APPWRITE_PROJECT_ID)
  .setKey(env.APPWRITE_API_KEY);

export const appwrite = {
  client,
  databases: new Databases(client),
  ID,
  Query,
  databaseId: env.APPWRITE_DATABASE_ID,
  contactCollectionId: env.APPWRITE_CONTACT_COLLECTION_ID,
  newsletterCollectionId: env.APPWRITE_NEWSLETTER_COLLECTION_ID,
};
