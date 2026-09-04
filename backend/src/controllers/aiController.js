const prisma = require("../config/db");

// =====================================================
// ANALYZE CHALLENGE
// =====================================================

const analyzeChallenge = async (req, res) => {
  try {
    const { id } = req.params;

    // -------------------------------------------------
    // Find challenge
    // -------------------------------------------------

    const challenge = await prisma.challenge.findUnique({
      where: {
        id,
      },
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    // -------------------------------------------------
    // Prepare text
    // -------------------------------------------------

    const text = `
      ${challenge.title}
      ${challenge.description}
      ${challenge.category}
    `
      .toLowerCase()
      .trim();

    let skills = [];
    let category = challenge.category;
    let priority = challenge.priority;

    // =================================================
    // WATER
    // =================================================

    if (
      text.includes("water") ||
      text.includes("drinking") ||
      text.includes("river") ||
      text.includes("irrigation") ||
      text.includes("water management")
    ) {
      category = "WATER";

      skills.push(
        "Water Management",
        "Water Quality Monitoring",
        "Environmental Engineering",
        "IoT"
      );
    }

    // =================================================
    // AGRICULTURE
    // =================================================

    if (
      text.includes("agriculture") ||
      text.includes("farmer") ||
      text.includes("crop") ||
      text.includes("farming") ||
      text.includes("irrigation")
    ) {
      category = "AGRICULTURE";

      skills.push(
        "Agriculture Technology",
        "IoT",
        "Data Analysis",
        "Environmental Engineering"
      );
    }

    // =================================================
    // HEALTHCARE
    // =================================================

    if (
      text.includes("health") ||
      text.includes("hospital") ||
      text.includes("medical") ||
      text.includes("medicine")
    ) {
      category = "HEALTHCARE";

      skills.push(
        "Healthcare Technology",
        "Artificial Intelligence",
        "Data Analysis"
      );
    }

    // =================================================
    // EDUCATION
    // =================================================

    if (
      text.includes("education") ||
      text.includes("school") ||
      text.includes("student") ||
      text.includes("college")
    ) {
      category = "EDUCATION";

      skills.push(
        "Education Technology",
        "Artificial Intelligence",
        "Web Development"
      );
    }

    // =================================================
    // ENVIRONMENT
    // =================================================

    if (
      text.includes("pollution") ||
      text.includes("waste") ||
      text.includes("environment") ||
      text.includes("sanitation") ||
      text.includes("garbage")
    ) {
      category = "ENVIRONMENT";

      skills.push(
        "Environmental Engineering",
        "Waste Management",
        "IoT"
      );
    }

    // =================================================
    // RURAL LIVELIHOODS
    // =================================================

    if (
      text.includes("livelihood") ||
      text.includes("rural development") ||
      text.includes("self help group") ||
      text.includes("employment")
    ) {
      category = "RURAL_LIVELIHOODS";

      skills.push(
        "Rural Development",
        "Data Analysis",
        "Web Development"
      );
    }

    // =================================================
    // URBAN INFRASTRUCTURE
    // =================================================

    if (
      text.includes("road") ||
      text.includes("traffic") ||
      text.includes("urban infrastructure") ||
      text.includes("street") ||
      text.includes("drainage")
    ) {
      category = "URBAN_INFRASTRUCTURE";

      skills.push(
        "Civil Engineering",
        "IoT",
        "Urban Planning",
        "Data Analysis"
      );
    }

    // =================================================
    // ACCESSIBILITY
    // =================================================

    if (
      text.includes("accessibility") ||
      text.includes("disabled") ||
      text.includes("disability") ||
      text.includes("wheelchair")
    ) {
      category = "ACCESSIBILITY";

      skills.push(
        "Accessibility Technology",
        "IoT",
        "Web Development"
      );
    }

    // =================================================
    // PUBLIC SERVICE
    // =================================================

    if (
      text.includes("public service") ||
      text.includes("government service") ||
      text.includes("citizen service")
    ) {
      category = "PUBLIC_SERVICE";

      skills.push(
        "Web Development",
        "Data Analysis",
        "Artificial Intelligence"
      );
    }

    // =================================================
    // DEFAULT SKILLS
    // =================================================

    skills = [...new Set(skills)];

    if (skills.length === 0) {
      skills = [
        "Problem Solving",
        "Data Analysis",
        "Technology",
      ];
    }

    // =================================================
    // PRIORITY
    // =================================================

    if (
      text.includes("critical") ||
      text.includes("emergency") ||
      text.includes("death") ||
      text.includes("life threatening")
    ) {
      priority = "CRITICAL";
    } else if (
      text.includes("urgent") ||
      text.includes("shortage") ||
      text.includes("lack") ||
      text.includes("severe")
    ) {
      priority = "HIGH";
    }

    // =================================================
    // IMPACT SCORE
    // =================================================

    let impactScore = 60;

    if (challenge.affectedPopulation) {
      if (challenge.affectedPopulation > 10000) {
        impactScore = 95;
      } else if (challenge.affectedPopulation > 5000) {
        impactScore = 85;
      } else if (challenge.affectedPopulation > 1000) {
        impactScore = 75;
      } else {
        impactScore = 65;
      }
    }

    // =================================================
    // SAVE AI ANALYSIS
    // =================================================

    const analysis = await prisma.aIAnalysis.upsert({
      where: {
        challengeId: challenge.id,
      },

      update: {
        category,
        confidence: 0.90,
        priority,
        duplicateDetected: false,
        duplicateScore: 0,
        recommendedSkills: skills,
        recommendedUniversities: [],
        impactScore,
      },

      create: {
        challengeId: challenge.id,
        category,
        confidence: 0.90,
        priority,
        duplicateDetected: false,
        duplicateScore: 0,
        recommendedSkills: skills,
        recommendedUniversities: [],
        impactScore,
      },
    });

    // =================================================
    // RESPONSE
    // =================================================

    return res.status(200).json({
      success: true,
      message: "Challenge analyzed successfully",

      analysis: {
        id: analysis.id,
        challengeId: analysis.challengeId,
        category: analysis.category,
        confidence: analysis.confidence,
        priority: analysis.priority,
        duplicateDetected: analysis.duplicateDetected,
        recommendedSkills: analysis.recommendedSkills,
        recommendedUniversities:
          analysis.recommendedUniversities,
        impactScore: analysis.impactScore,
      },
    });
  } catch (error) {
    console.error("AI ANALYSIS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed",
      error: error.message,
    });
  }
};

module.exports = {
  analyzeChallenge,
};