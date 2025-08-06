import { PrismaClient } from '@prisma/client';

console.log("✅ PrismaClient import starting...");

const prisma = new PrismaClient();

console.log("✅ PrismaClient initialized.");

export default prisma;

