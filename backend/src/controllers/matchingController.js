const {
  getMatchResults,
} = require("../services/matchingService");

const matchChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: "challengeId is required",
      });
    }

    const result =
      await getMatchResults(
        challengeId
      );

    return res.status(200).json({
      success: true,

      message:
        "Challenge matched successfully",

      challenge: {
        id: result.challenge.id,
        title: result.challenge.title,
        category:
          result.challenge.category,
        district:
          result.challenge.district,
        priority:
          result.challenge.priority,
        status:
          result.challenge.status,
      },

      aiAnalysis: {
        category:
          result.analysis.category,

        confidence:
          result.analysis.confidence,

        priority:
          result.analysis.priority,

        recommendedSkills:
          result.analysis
            .recommendedSkills,

        impactScore:
          result.analysis.impactScore,
      },

      bestUniversity:
        result.bestUniversity,

      universities:
        result.universities,

      bestIndustry:
        result.bestIndustry,

      industries:
        result.industries,
    });
  } catch (error) {
    console.error(
      "MATCH CHALLENGE ERROR:",
      error
    );

    return res.status(
      error.statusCode || 500
    ).json({
      success: false,
      message:
        error.message ||
        "Failed to match challenge",
    });
  }
};

module.exports = {
  matchChallenge,
};