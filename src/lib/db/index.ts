import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};


const adapter = new PrismaPg({
  host: "db.gorrpwuossagofbkobvm.supabase.co",
  user: "postgres",
  password: "hgYZMNwROt0ngHu4",
  database: "postgres",
});

export const prisma = globalForPrisma.prisma ?? new PrismaClient({adapter});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function getTimers() {
  return await prisma.timer.findMany();
}

export async function createTimer(data: { title: string; duration: number; remainingTime: number }) {
  return await prisma.timer.create({ data });
}

export async function updateTimer(id: string, data: Partial<{ title: string; duration: number; remainingTime: number; isActive: boolean; isPaused: boolean }>) {
  return await prisma.timer.update({ where: { id }, data });
}

export async function deleteTimer(id: string) {
  return await prisma.timer.delete({ where: { id } });
}