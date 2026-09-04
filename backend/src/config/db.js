require("dotenv").config();

const {
  PrismaClient,
} = require("@prisma/client");

const {
  PrismaPg,
} = require("@prisma/adapter-pg");

console.log(
  "DATABASE_URL exists:",
  !!process.env.DATABASE_URL
);

const adapter = new PrismaPg({
  connectionString:
    process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

module.exports = prisma;