const {
  getMatchResults,
} = require("../services/matchingService");

// =====================================================
// MATCH CHALLENGE
// GET /api/matching/:challengeId
// =====================================================

const matchChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;

    // ---------------------------------------------------
    // Validate Challenge ID
    // ---------------------------------------------------

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: "Challenge ID is required",
      });
    }

    // ---------------------------------------------------
    // Get Matching Results
    // ---------------------------------------------------

    const result =
      await getMatchResults(challengeId);

    // ---------------------------------------------------
    // Success Response
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,

      message:
        "Challenge matched successfully",

      // -------------------------------------------------
      // Challenge
      // -------------------------------------------------

      challenge: {
        id: result.challenge.id,

        title:
          result.challenge.title,

        description:
          result.challenge.description,

        category:
          result.challenge.category,

        district:
          result.challenge.district,

        priority:
          result.challenge.priority,

        status:
          result.challenge.status,
      },

      // -------------------------------------------------
      // AI Analysis
      // -------------------------------------------------

      aiAnalysis: {
        category:
          result.analysis.category,

        confidence:
          result.analysis.confidence,

        priority:
          result.analysis.priority,

        recommendedSkills:
          result.analysis.recommendedSkills,

        impactScore:
          result.analysis.impactScore,
      },

      // -------------------------------------------------
      // Best University
      // -------------------------------------------------

      bestUniversity:
        result.bestUniversity,

      // -------------------------------------------------
      // Recommended Universities
      // -------------------------------------------------

      universities:
        result.universities,

      // -------------------------------------------------
      // Best Industry
      // -------------------------------------------------

      bestIndustry:
        result.bestIndustry,

      // -------------------------------------------------
      // Recommended Industries
      // -------------------------------------------------

      industries:
        result.industries,

      // -------------------------------------------------
      // Existing Project
      // -------------------------------------------------

      existingProject:
        result.existingProject,
    });
  } catch (error) {
    console.error(
      "MATCH CHALLENGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,

      message:
        error.message ||
        "Failed to match challenge",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  matchChallenge,
};