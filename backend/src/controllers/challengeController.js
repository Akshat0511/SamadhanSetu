const prisma = require("../config/db");

// =====================================================
// CREATE CHALLENGE
// =====================================================

const createChallenge = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      district,
      location,
      priority,
    } = req.body;

    // -----------------------------------------------
    // Validate required fields
    // -----------------------------------------------

    if (!title || !description || !category || !district) {
      return res.status(400).json({
        success: false,
        message:
          "Title, description, category and district are required",
      });
    }

    // -----------------------------------------------
    // Get logged-in user from JWT
    // -----------------------------------------------

    const userId = req.user?.userId;

    console.log("JWT DECODED USER:", req.user);
    console.log("AUTHENTICATED USER ID:", userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    // -----------------------------------------------
    // Check user exists
    // -----------------------------------------------

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user not found",
      });
    }

    // -----------------------------------------------
    // Create challenge
    // -----------------------------------------------

    const challenge = await prisma.challenge.create({
      data: {
        title: title.trim(),
        description: description.trim(),
        category,
        district,
        location: location?.trim() || null,

        // Use frontend priority if provided
        priority: priority || "MEDIUM",

        // Connect challenge with logged-in user
        user: {
          connect: {
            id: userId,
          },
        },
      },

      // -----------------------------------------------
      // Return user information also
      // -----------------------------------------------

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            district: true,
          },
        },
      },
    });

    // -----------------------------------------------
    // Success response
    // -----------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Challenge created successfully",
      challenge,
    });
  } catch (error) {
    console.error("CREATE CHALLENGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to submit challenge",
      error: error.message,
    });
  }
};


// =====================================================
// GET ALL CHALLENGES
// =====================================================

const getChallenges = async (req, res) => {
  try {
    const challenges = await prisma.challenge.findMany({
      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            district: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: challenges.length,
      challenges,
    });
  } catch (error) {
    console.error("GET CHALLENGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch challenges",
    });
  }
};


// =====================================================
// GET SINGLE CHALLENGE
// =====================================================

const getChallengeById = async (req, res) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            district: true,
          },
        },
      },
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    return res.status(200).json({
      success: true,
      challenge,
    });
  } catch (error) {
    console.error("GET CHALLENGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch challenge",
    });
  }
};


// =====================================================
// UPDATE CHALLENGE STATUS
// =====================================================

const updateChallengeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "SUBMITTED",
      "UNDER_REVIEW",
      "ASSIGNED",
      "IN_PROGRESS",
      "RESOLVED",
      "REJECTED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const existingChallenge =
      await prisma.challenge.findUnique({
        where: {
          id,
        },
      });

    if (!existingChallenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    const challenge = await prisma.challenge.update({
      where: {
        id,
      },

      data: {
        status,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Challenge status updated successfully",
      challenge,
    });
  } catch (error) {
    console.error("UPDATE STATUS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update challenge status",
    });
  }
};


// =====================================================
// GET MY CHALLENGES
// =====================================================

const getMyChallenges = async (req, res) => {
  try {
    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User ID not found in token",
      });
    }

    const challenges = await prisma.challenge.findMany({
      where: {
        userId,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            district: true,
          },
        },
      },
    });

    return res.status(200).json({
      success: true,
      count: challenges.length,
      challenges,
    });
  } catch (error) {
    console.error("GET MY CHALLENGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch your challenges",
    });
  }
};


// =====================================================
// EXPORT
// =====================================================

module.exports = {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallengeStatus,
  getMyChallenges,
};