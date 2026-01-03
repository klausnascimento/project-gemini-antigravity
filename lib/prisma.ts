import { PrismaClient } from '@prisma/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

const prismaClientSingleton = () => {
  // Extract path from DATABASE_URL ("file:./dev.db" -> "./dev.db")
  const url = process.env.DATABASE_URL?.replace('file:', '') || './dev.db'
  const adapter = new PrismaBetterSqlite3(new Database(url) as any)
  
  return new PrismaClient({ adapter } as any)
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
