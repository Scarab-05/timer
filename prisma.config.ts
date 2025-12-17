import "dotenv/config";
import { defineConfig, env } from "prisma/config";

const connStr = "postgresql://postgres.gorrpwuossagofbkobvm:hgYZMNwROt0ngHu4@aws-1-eu-west-1.pooler.supabase.com:5432/postgres?schema=public";
export default defineConfig({
  schema: "./prisma/schema.prisma",
  migrations: {
    path: "./prisma/migrations",
  },
  datasource: {
    url: connStr,
  },
});