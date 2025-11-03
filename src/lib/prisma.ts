// TODO: Voltar o prisma.ts com o withAccelerate.
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { PrismaClient } from "@/generated/prisma/client";

// const globalForPrisma = global as unknown as {
//   prisma: PrismaClient;
// };

// const prisma = globalForPrisma.prisma || new PrismaClient(); //.$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// export { prisma };

import path from "node:path";
import { PrismaClient } from "@/generated/prisma/client";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: `file:${path.resolve(process.cwd(), "prisma/dev.db")}`,
    },
  },
});

export { prisma };
