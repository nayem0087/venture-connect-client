import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGO_DB_URL);
const db = client.db(process.env.AUTH_DB_NAME);

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  trustedOrigins: [
    "http://localhost:3000",
    process.env.NEXT_PUBLIC_APP_URL, // your deployed Next.js app URL, e.g. https://venture-connect-client.vercel.app
  ].filter(Boolean),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },

  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "collaborator" },
      plan: { type: "string", defaultValue: "collaborator-free" }
    }
  }
});