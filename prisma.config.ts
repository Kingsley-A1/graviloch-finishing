/**
 * Prisma Configuration for Prisma 7+
 * ===================================
 * Handles database connection configuration.
 */

import path from "node:path";
import { defineConfig } from "prisma/config";
import "dotenv/config";



export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL!
  }
});
