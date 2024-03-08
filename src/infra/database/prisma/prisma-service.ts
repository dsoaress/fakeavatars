import { PrismaClient } from "@prisma/client";

const globalPrisma = global as unknown as { prisma: PrismaClient };
const prismaService = globalPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalPrisma.prisma = prismaService;

export { prismaService };
