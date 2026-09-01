const prisma = require("../config/db");

const getAllChallenges = async (req, res) => {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: {
        createdAt: "desc"
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            district: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      count: challenges.length,
      challenges
    });

  } catch (error) {
    console.error("ADMIN GET CHALLENGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch challenges"
    });
  }
};

module.exports = {
  getAllChallenges
};