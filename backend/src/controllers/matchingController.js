const prisma = require("../config/db");

// =====================================================
// Helper Functions
// =====================================================

const normalize = (value) => {
  return String(value || "")
    .trim()
    .toLowerCase();
};

const normalizeArray = (array) => {
  if (!Array.isArray(array)) return [];

  return array
    .map((item) => normalize(item))
    .filter(Boolean);
};

// Check whether two text values have meaningful similarity
const isMatch = (value1, value2) => {
  const a = normalize(value1);
  const b = normalize(value2);

  if (!a || !b) return false;

  return (
    a === b ||
    a.includes(b) ||
    b.includes(a)
  );
};

// =====================================================
// Calculate University Match Score
// Maximum = 100
// =====================================================

const calculateUniversityScore = ({
  challenge,
  analysis,
  university
}) => {
  let score = 0;

  const matchedSkills = [];
  const reasons = [];

  const recommendedSkills =
    analysis.recommendedSkills || [];

  const researchAreas =
    university.researchAreas || [];

  const departments =
    university.departments || [];

  // ---------------------------------------------------
  // 1. Research Area Matching
  // ---------------------------------------------------

  for (const skill of recommendedSkills) {
    const researchMatch = researchAreas.find((area) =>
      isMatch(skill, area)
    );

    if (researchMatch) {
      score += 20;

      if (!matchedSkills.includes(skill)) {
        matchedSkills.push(skill);
      }

      reasons.push(
        `Research area matches ${skill}`
      );
    }
  }

  // ---------------------------------------------------
  // 2. Department Matching
  // ---------------------------------------------------

  for (const skill of recommendedSkills) {
    const departmentMatch = departments.find(
      (department) =>
        isMatch(skill, department)
    );

    if (departmentMatch) {
      score += 10;

      if (!matchedSkills.includes(skill)) {
        matchedSkills.push(skill);
      }

      reasons.push(
        `Department matches ${skill}`
      );
    }
  }

  // ---------------------------------------------------
  // 3. Category Matching
  // ---------------------------------------------------

  const category = normalize(
    analysis.category || challenge.category
  );

  const categoryWords = category
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const universityText = normalize(
    [
      ...researchAreas,
      ...departments
    ].join(" ")
  );

  const categoryMatch = categoryWords.some(
    (word) => universityText.includes(word)
  );

  if (categoryMatch) {
    score += 15;
    reasons.push("Category matches university expertise");
  }

  // ---------------------------------------------------
  // 4. District Matching
  // ---------------------------------------------------

  if (
    normalize(university.district) ===
    normalize(challenge.district)
  ) {
    score += 15;
    reasons.push("University is in the same district");
  }

  // ---------------------------------------------------
  // 5. Priority Bonus
  // ---------------------------------------------------

  if (challenge.priority === "CRITICAL") {
    score += 10;
    reasons.push("Critical priority challenge");
  } else if (challenge.priority === "HIGH") {
    score += 5;
    reasons.push("High priority challenge");
  }

  // ---------------------------------------------------
  // Remove duplicate reasons
  // ---------------------------------------------------

  const uniqueReasons = [
    ...new Set(reasons)
  ];

  return {
    score: Math.min(score, 100),
    matchedSkills,
    reasons: uniqueReasons
  };
};

// =====================================================
// Calculate Industry Match Score
// Maximum = 100
// =====================================================

const calculateIndustryScore = ({
  challenge,
  analysis,
  partner
}) => {
  let score = 0;

  const matchedSkills = [];
  const reasons = [];

  const recommendedSkills =
    analysis.recommendedSkills || [];

  const expertise =
    partner.expertise || [];

  const industry =
    partner.industry || "";

  // ---------------------------------------------------
  // 1. Expertise Matching
  // ---------------------------------------------------

  for (const skill of recommendedSkills) {
    const expertiseMatch = expertise.find(
      (item) => isMatch(skill, item)
    );

    if (expertiseMatch) {
      score += 20;

      if (!matchedSkills.includes(skill)) {
        matchedSkills.push(skill);
      }

      reasons.push(
        `Industry expertise matches ${skill}`
      );
    }
  }

  // ---------------------------------------------------
  // 2. Industry / Category Matching
  // ---------------------------------------------------

  const category = normalize(
    analysis.category || challenge.category
  );

  const industryText = normalize(
    industry
  );

  const categoryWords = category
    .replace(/_/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 2);

  const industryMatch = categoryWords.some(
    (word) => industryText.includes(word)
  );

  if (industryMatch) {
    score += 20;
    reasons.push(
      "Industry matches challenge category"
    );
  }

  // ---------------------------------------------------
  // 3. Combined expertise/category matching
  // ---------------------------------------------------

  const combinedExpertise = normalize(
    expertise.join(" ")
  );

  const combinedMatch = categoryWords.some(
    (word) => combinedExpertise.includes(word)
  );

  if (combinedMatch) {
    score += 10;
    reasons.push(
      "Industry expertise is relevant to challenge"
    );
  }

  // ---------------------------------------------------
  // 4. Priority Bonus
  // ---------------------------------------------------

  if (challenge.priority === "CRITICAL") {
    score += 10;
    reasons.push("Critical priority challenge");
  } else if (challenge.priority === "HIGH") {
    score += 5;
    reasons.push("High priority challenge");
  }

  // ---------------------------------------------------
  // Remove duplicate reasons
  // ---------------------------------------------------

  const uniqueReasons = [
    ...new Set(reasons)
  ];

  return {
    score: Math.min(score, 100),
    matchedSkills,
    reasons: uniqueReasons
  };
};

// =====================================================
// Main Matching Controller
// =====================================================

const matchChallenge = async (req, res) => {
  try {
    const { challengeId } = req.params;

    // ---------------------------------------------------
    // Validate challengeId
    // ---------------------------------------------------

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: "challengeId is required"
      });
    }

    // ---------------------------------------------------
    // Get Challenge + AI Analysis
    // ---------------------------------------------------

    const challenge =
      await prisma.challenge.findUnique({
        where: {
          id: challengeId
        },
        include: {
          aiAnalysis: true
        }
      });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      });
    }

    // ---------------------------------------------------
    // Check AI Analysis
    // ---------------------------------------------------

    if (!challenge.aiAnalysis) {
      return res.status(400).json({
        success: false,
        message:
          "Challenge has not been analyzed yet. Please analyze the challenge first."
      });
    }

    const analysis =
      challenge.aiAnalysis;

    const recommendedSkills =
      analysis.recommendedSkills || [];

    // ---------------------------------------------------
    // Get Universities
    // ---------------------------------------------------

    const universities =
      await prisma.university.findMany({
        orderBy: {
          name: "asc"
        }
      });

    // ---------------------------------------------------
    // Match Universities
    // ---------------------------------------------------

    const universityMatches =
      universities.map((university) => {
        const result =
          calculateUniversityScore({
            challenge,
            analysis,
            university
          });

        return {
          universityId: university.id,
          universityName: university.name,
          district: university.district,
          description: university.description,
          researchAreas:
            university.researchAreas || [],
          departments:
            university.departments || [],
          matchScore: result.score,
          matchedSkills:
            result.matchedSkills,
          reasons:
            result.reasons
        };
      });

    // ---------------------------------------------------
    // Sort Universities
    // ---------------------------------------------------

    universityMatches.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    // ---------------------------------------------------
    // Get Industry Partners
    // ---------------------------------------------------

    const industryPartners =
      await prisma.industryPartner.findMany({
        orderBy: {
          name: "asc"
        }
      });

    // ---------------------------------------------------
    // Match Industry Partners
    // ---------------------------------------------------

    const industryMatches =
      industryPartners.map((partner) => {
        const result =
          calculateIndustryScore({
            challenge,
            analysis,
            partner
          });

        return {
          industryId: partner.id,
          industryName: partner.name,
          industry: partner.industry,
          description: partner.description,
          expertise:
            partner.expertise || [],
          matchScore: result.score,
          matchedSkills:
            result.matchedSkills,
          reasons:
            result.reasons
        };
      });

    // ---------------------------------------------------
    // Sort Industry Partners
    // ---------------------------------------------------

    industryMatches.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    // ---------------------------------------------------
    // Top Matches
    // ---------------------------------------------------

    const topUniversities =
      universityMatches
        .filter(
          (item) => item.matchScore > 0
        )
        .slice(0, 5);

    const topIndustryPartners =
      industryMatches
        .filter(
          (item) => item.matchScore > 0
        )
        .slice(0, 5);

    // ---------------------------------------------------
    // Save University Recommendations
    // ---------------------------------------------------

    await prisma.aIAnalysis.update({
      where: {
        challengeId
      },
      data: {
        recommendedUniversities:
          topUniversities.map(
            (university) =>
              university.universityName
          )
      }
    });

    // ---------------------------------------------------
    // Response
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Challenge matched successfully",

      challenge: {
        id: challenge.id,
        title: challenge.title,
        category: challenge.category,
        district: challenge.district,
        priority: challenge.priority,
        status: challenge.status
      },

      aiAnalysis: {
        category: analysis.category,
        confidence: analysis.confidence,
        priority: analysis.priority,
        recommendedSkills,
        impactScore:
          analysis.impactScore
      },

      bestUniversity:
        topUniversities.length > 0
          ? topUniversities[0]
          : null,

      bestIndustry:
        topIndustryPartners.length > 0
          ? topIndustryPartners[0]
          : null,

      universities:
        topUniversities,

      industryPartners:
        topIndustryPartners
    });

  } catch (error) {
    console.error(
      "MATCH CHALLENGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to match challenge",
      error: error.message
    });
  }
};

module.exports = {
  matchChallenge
};