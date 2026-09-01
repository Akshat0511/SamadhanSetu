const prisma = require("../src/config/db");

async function deleteChallenges() {
  try {
    const result = await prisma.challenge.deleteMany({});

    console.log(`Deleted ${result.count} challenges`);
  } catch (error) {
    console.error("DELETE CHALLENGES ERROR:", error);
  } finally {
    await prisma.$disconnect();
  }
}

deleteChallenges();