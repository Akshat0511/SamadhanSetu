require("dotenv").config();

const bcrypt = require("bcryptjs");
const prisma = require("./config/db");

async function createAdmin() {
  try {
    const hashedPassword = await bcrypt.hash("admin12345", 10);

    const admin = await prisma.user.upsert({
      where: {
        email: "admin@samadhansetu.com"
      },
      update: {
        role: "ADMIN",
        password: hashedPassword
      },
      create: {
        name: "Samadhan Setu Admin",
        email: "admin@samadhansetu.com",
        password: hashedPassword,
        phone: "9999999999",
        role: "ADMIN",
        district: "Ranchi",
        organization: "Samadhan Setu"
      }
    });

    console.log("ADMIN CREATED SUCCESSFULLY");
    console.log({
      id: admin.id,
      name: admin.name,
      email: admin.email,
      role: admin.role
    });

  } catch (error) {
    console.error("ADMIN CREATION ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();