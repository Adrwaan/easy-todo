import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../prisma";

export const auth = betterAuth({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  database: prismaAdapter(prisma, {
    provider: "sqlite",
    // TODO: Re-configurar o auth.ts e o prisma em si para mongodb.
    // provider: "mongodb",
  }),

  emailAndPassword: {
    enabled: true,
  },
});
