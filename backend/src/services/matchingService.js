const prisma = require("../config/db");

// =====================================================
// HELPERS
// =====================================================

const normalize = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[-_/]/g, " ")
    .replace(/\s+/g, " ");
};

const normalizeArray = (value) => {
  if (!Array.isArray(value)) return [];

  return value
    .map((item) => normalize(item))
    .filter(Boolean);
};

// =====================================================
// SEMANTIC ALIASES
// =====================================================

const aliases = {
  agriculture: [
    "agriculture",
    "agriculture technology",
    "smart agriculture",
    "farming",
    "precision agriculture",
    "agritech",
    "crop",
    "crops",
    "farmer",
    "farmers",
  ],

  water: [
    "water",
    "water management",
    "water quality",
    "water quality monitoring",
    "irrigation",
    "water resources",
    "drinking water",
    "river",
  ],

  iot: [
    "iot",
    "internet of things",
    "sensor",
    "sensors",
    "smart sensor",
    "soil moisture",
  ],

  ai: [
    "ai",
    "artificial intelligence",
    "machine learning",
    "ml",
  ],

  data: [
    "data",
    "data analysis",
    "data analytics",
    "analytics",
    "data science",
  ],

  environment: [
    "environment",
    "environmental engineering",
    "environmental science",
    "waste management",
    "pollution",
    "sanitation",
  ],

  healthcare: [
    "healthcare",
    "health",
    "medical",
    "medical technology",
  ],

  education: [
    "education",
    "education technology",
    "edtech",
  ],

  web: [
    "web development",
    "web",
    "software development",
    "software",
  ],

  electrical: [
    "electrical engineering",
    "electrical",
    "electronics",
    "electronics engineering",
  ],

  computer: [
    "computer science",
    "computer engineering",
    "computer",
    "information technology",
    "it",
  ],

  mechanical: [
    "mechanical engineering",
    "mechanical",
  ],

  civil: [
    "civil engineering",
    "civil",
  ],
};

// =====================================================
// SEMANTIC MATCH
// =====================================================

const semanticMatch = (value1, value2) => {
  const a = normalize(value1);
  const b = normalize(value2);

  if (!a || !b) return false;

  // Exact match
  if (a === b) {
    return true;
  }

  // One contains the other
  if (a.includes(b) || b.includes(a)) {
    return true;
  }

  // Alias-based matching
  for (const group of Object.values(aliases)) {
    const aMatches = group.some(
      (item) =>
        a === item ||
        a.includes(item) ||
        item.includes(a)
    );

    const bMatches = group.some(
      (item) =>
        b === item ||
        b.includes(item) ||
        item.includes(b)
    );

    if (aMatches && bMatches) {
      return true;
    }
  }

  return false;
};

// =====================================================
// CHECK CATEGORY
// =====================================================

const categoryMatches = (
  challengeCategory,
  universityData
) => {
  if (!challengeCategory) {
    return false;
  }

  const category = normalize(challengeCategory);

  return universityData.some((item) =>
    semanticMatch(category, item)
  );
};

// =====================================================
// INDUSTRY CATEGORY MATCH
// =====================================================

const categoryMatchesIndustry = (
  challengeCategory,
  industry
) => {
  const category = normalize(challengeCategory);

  if (!category) {
    return false;
  }

  // First check industry category
  if (
    semanticMatch(
      category,
      industry?.industry
    )
  ) {
    return true;
  }

  // Then check industry expertise
  return normalizeArray(
    industry?.expertise
  ).some((expertise) =>
    semanticMatch(category, expertise)
  );
};

// =====================================================
// RESEARCH SCORE
// Maximum = 35
// =====================================================

const calculateResearchScore = (
  recommendedSkills,
  researchAreas
) => {
  if (
    !recommendedSkills.length ||
    !researchAreas.length
  ) {
    return {
      score: 0,
      matchedSkills: [],
    };
  }

  const matchedSkills = [];

  for (const skill of recommendedSkills) {
    const matched = researchAreas.find((area) =>
      semanticMatch(skill, area)
    );

    if (matched) {
      matchedSkills.push(skill);
    }
  }

  const uniqueMatched = [
    ...new Set(matchedSkills),
  ];

  const ratio =
    uniqueMatched.length /
    recommendedSkills.length;

  return {
    score: Math.round(
      Math.min(ratio * 35, 35)
    ),
    matchedSkills: uniqueMatched,
  };
};

// =====================================================
// DEPARTMENT SCORE
// Maximum = 20
// =====================================================

const calculateDepartmentScore = (
  recommendedSkills,
  departments
) => {
  if (
    !recommendedSkills.length ||
    !departments.length
  ) {
    return 0;
  }

  let matches = 0;

  for (const skill of recommendedSkills) {
    const matched = departments.some(
      (department) =>
        semanticMatch(skill, department)
    );

    if (matched) {
      matches++;
    }
  }

  const ratio =
    matches / recommendedSkills.length;

  return Math.round(
    Math.min(ratio * 20, 20)
  );
};

// =====================================================
// CATEGORY SCORE
// Maximum = 20
// =====================================================

const calculateCategoryScore = (
  category,
  researchAreas,
  departments
) => {
  const allData = [
    ...researchAreas,
    ...departments,
  ];

  return categoryMatches(
    category,
    allData
  )
    ? 20
    : 0;
};

// =====================================================
// DISTRICT SCORE
// Maximum = 15
// =====================================================

const calculateDistrictScore = (
  challengeDistrict,
  universityDistrict
) => {
  if (
    !challengeDistrict ||
    !universityDistrict
  ) {
    return 0;
  }

  return normalize(challengeDistrict) ===
    normalize(universityDistrict)
    ? 15
    : 0;
};

// =====================================================
// PRIORITY SCORE
// Maximum = 10
// =====================================================

const calculatePriorityScore = (
  priority
) => {
  switch (
    String(priority || "").toUpperCase()
  ) {
    case "CRITICAL":
      return 10;

    case "HIGH":
      return 8;

    case "MEDIUM":
      return 5;

    case "LOW":
      return 2;

    default:
      return 0;
  }
};

// =====================================================
// UNIVERSITY MATCH
// Maximum = 100
// =====================================================

const calculateUniversityMatch = (
  challenge,
  analysis,
  university
) => {
  const recommendedSkills =
    normalizeArray(
      analysis?.recommendedSkills
    );

  const researchAreas =
    normalizeArray(
      university?.researchAreas
    );

  const departments =
    normalizeArray(
      university?.departments
    );

  const researchResult =
    calculateResearchScore(
      recommendedSkills,
      researchAreas
    );

  const departmentScore =
    calculateDepartmentScore(
      recommendedSkills,
      departments
    );

  const categoryScore =
    calculateCategoryScore(
      analysis?.category ||
        challenge.category,
      researchAreas,
      departments
    );

  const districtScore =
    calculateDistrictScore(
      challenge.district,
      university.district
    );

  const priorityScore =
    calculatePriorityScore(
      analysis?.priority ||
        challenge.priority
    );

  const totalScore = Math.min(
    researchResult.score +
      departmentScore +
      categoryScore +
      districtScore +
      priorityScore,
    100
  );

  const reasons = [];

  if (researchResult.score > 0) {
    reasons.push(
      `${researchResult.matchedSkills.length} relevant research skill(s) matched`
    );
  }

  if (departmentScore > 0) {
    reasons.push(
      "Relevant academic department found"
    );
  }

  if (categoryScore > 0) {
    reasons.push(
      "University research profile matches the challenge category"
    );
  }

  if (districtScore > 0) {
    reasons.push(
      "University is located in the same district"
    );
  }

  if (priorityScore > 0) {
    reasons.push(
      `${challenge.priority} priority challenge`
    );
  }

  return {
    id: university.id,
    name: university.name,
    district: university.district,

    matchScore: totalScore,

    matchedSkills:
      researchResult.matchedSkills,

    reasons,

    breakdown: {
      research:
        researchResult.score,

      department:
        departmentScore,

      category:
        categoryScore,

      district:
        districtScore,

      priority:
        priorityScore,
    },
  };
};

// =====================================================
// INDUSTRY MATCH
// Maximum = 100
// =====================================================

const calculateIndustryMatch = (
  challenge,
  analysis,
  industry
) => {
  const recommendedSkills =
    normalizeArray(
      analysis?.recommendedSkills
    );

  const expertise =
    normalizeArray(
      industry?.expertise
    );

  const challengeCategory =
    normalize(
      analysis?.category ||
        challenge.category
    );

  let score = 0;

  const matchedSkills = [];
  const reasons = [];

  // ---------------------------------------------------
  // Expertise Matching
  // Maximum = 60
  // ---------------------------------------------------

  for (const skill of recommendedSkills) {
    const matched = expertise.find(
      (item) =>
        semanticMatch(skill, item)
    );

    if (matched) {
      matchedSkills.push(skill);
    }
  }

  const uniqueMatchedSkills = [
    ...new Set(matchedSkills),
  ];

  let expertiseScore = 0;

  if (recommendedSkills.length > 0) {
    expertiseScore = Math.min(
      Math.round(
        (uniqueMatchedSkills.length /
          recommendedSkills.length) *
          60
      ),
      60
    );
  }

  score += expertiseScore;

  // ---------------------------------------------------
  // Industry Category Matching
  // Maximum = 25
  // ---------------------------------------------------

  const categoryMatched =
    categoryMatchesIndustry(
      challengeCategory,
      industry
    );

  if (categoryMatched) {
    score += 25;

    reasons.push(
      "Industry expertise matches the challenge category"
    );
  }

  // ---------------------------------------------------
  // Matched Skills Reason
  // ---------------------------------------------------

  if (
    uniqueMatchedSkills.length > 0
  ) {
    reasons.push(
      `${uniqueMatchedSkills.length} relevant expertise skill(s) matched`
    );
  }

  // ---------------------------------------------------
  // Priority
  // Maximum = 10
  // ---------------------------------------------------

  const priorityScore =
    calculatePriorityScore(
      analysis?.priority ||
        challenge.priority
    );

  const priorityContribution =
    Math.min(
      priorityScore,
      10
    );

  score += priorityContribution;

  // ---------------------------------------------------
  // Final Result
  // ---------------------------------------------------

  return {
    id: industry.id,

    name: industry.name,

    industry: industry.industry,

    matchScore: Math.min(
      score,
      100
    ),

    matchedSkills:
      uniqueMatchedSkills,

    reasons,

    breakdown: {
      expertise:
        expertiseScore,

      category:
        categoryMatched
          ? 25
          : 0,

      priority:
        priorityContribution,
    },
  };
};

// =====================================================
// MAIN MATCHING FUNCTION
// =====================================================

const getMatchResults = async (
  challengeId
) => {
  // ---------------------------------------------------
  // Challenge
  // ---------------------------------------------------

  const challenge =
    await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },

      include: {
        aiAnalysis: true,
        project: true,
      },
    });

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  // ---------------------------------------------------
  // AI Analysis
  // ---------------------------------------------------

  if (!challenge.aiAnalysis) {
    throw new Error(
      "AI analysis not found. Please analyze the challenge first."
    );
  }

  const analysis =
    challenge.aiAnalysis;

  // ---------------------------------------------------
  // Universities
  // ---------------------------------------------------

  const universities =
    await prisma.university.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const universityResults =
    universities
      .map((university) =>
        calculateUniversityMatch(
          challenge,
          analysis,
          university
        )
      )
      .filter(
        (university) =>
          university.matchScore > 0
      )
      .sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      )
      .slice(0, 5);

  // ---------------------------------------------------
  // Industries
  // ---------------------------------------------------

  const industries =
    await prisma.industryPartner.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const industryResults =
    industries
      .map((industry) =>
        calculateIndustryMatch(
          challenge,
          analysis,
          industry
        )
      )
      .filter(
        (industry) =>
          industry.matchScore > 0
      )
      .sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      )
      .slice(0, 5);

  // ---------------------------------------------------
  // Save Recommended Universities
  // ---------------------------------------------------

  await prisma.aIAnalysis.update({
    where: {
      id: analysis.id,
    },

    data: {
      recommendedUniversities:
        universityResults.map(
          (university) =>
            university.name
        ),
    },
  });

  // ---------------------------------------------------
  // Best University
  // ---------------------------------------------------

  const bestUniversity =
    universityResults.length > 0
      ? universityResults[0]
      : null;

  // ---------------------------------------------------
  // Best Industry
  // ---------------------------------------------------

  const bestIndustry =
    industryResults.length > 0
      ? industryResults[0]
      : null;

  // ---------------------------------------------------
  // Final Response
  // ---------------------------------------------------

  return {
    challenge,

    analysis,

    universities:
      universityResults,

    industries:
      industryResults,

    bestUniversity,

    bestIndustry,

    existingProject:
      challenge.project || null,
  };
};

// =====================================================
// EXPORTS
// =====================================================

module.exports = {
  getMatchResults,
  calculateUniversityMatch,
  calculateIndustryMatch,
};