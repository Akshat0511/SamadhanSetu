const prisma = require("../config/db");

// =====================================================
// NORMALIZATION
// =====================================================

const normalize = (value) => {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[_-]/g, " ")
    .replace(/\s+/g, " ");
};

const normalizeArray = (arr) => {
  if (!Array.isArray(arr)) {
    return [];
  }

  return arr
    .map(normalize)
    .filter(Boolean);
};

// =====================================================
// ALIASES
// =====================================================

const aliases = {
  agriculture: [
    "agriculture",
    "agriculture technology",
    "smart agriculture",
    "farming",
    "precision agriculture",
    "agritech",
    "agri technology",
  ],

  water: [
    "water",
    "water management",
    "water quality",
    "water quality monitoring",
    "irrigation",
    "water resources",
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
    "urban planning",
  ],

  rural: [
    "rural development",
    "rural livelihoods",
    "livelihood",
  ],

  accessibility: [
    "accessibility",
    "assistive technology",
    "disability technology",
  ],

  publicService: [
    "public service",
    "government service",
    "citizen service",
  ],
};

// =====================================================
// SEMANTIC MATCH
// =====================================================

const semanticMatch = (value1, value2) => {
  const a = normalize(value1);
  const b = normalize(value2);

  if (!a || !b) {
    return false;
  }

  // Exact match
  if (a === b) {
    return true;
  }

  // Partial match
  if (a.includes(b) || b.includes(a)) {
    return true;
  }

  // Alias match
  for (const group of Object.values(aliases)) {
    const hasA = group.some((item) => {
      const normalizedItem = normalize(item);

      return (
        a === normalizedItem ||
        a.includes(normalizedItem) ||
        normalizedItem.includes(a)
      );
    });

    const hasB = group.some((item) => {
      const normalizedItem = normalize(item);

      return (
        b === normalizedItem ||
        b.includes(normalizedItem) ||
        normalizedItem.includes(b)
      );
    });

    if (hasA && hasB) {
      return true;
    }
  }

  return false;
};

// =====================================================
// RESEARCH AREA SCORE
// MAX = 35
// =====================================================

const calculateResearchScore = (
  skills,
  researchAreas
) => {
  if (!skills.length || !researchAreas.length) {
    return {
      score: 0,
      matches: [],
    };
  }

  const matches = [];

  for (const skill of skills) {
    const found = researchAreas.find((area) =>
      semanticMatch(skill, area)
    );

    if (found && !matches.includes(skill)) {
      matches.push(skill);
    }
  }

  const ratio =
    matches.length /
    Math.max(skills.length, 1);

  return {
    score: Math.round(
      Math.min(ratio, 1) * 35
    ),
    matches,
  };
};

// =====================================================
// DEPARTMENT SCORE
// MAX = 20
// =====================================================

const calculateDepartmentScore = (
  skills,
  departments
) => {
  if (!skills.length || !departments.length) {
    return {
      score: 0,
      matches: [],
    };
  }

  const matches = [];

  for (const skill of skills) {
    const found = departments.find(
      (department) =>
        semanticMatch(skill, department)
    );

    if (found && !matches.includes(skill)) {
      matches.push(skill);
    }
  }

  const ratio =
    matches.length /
    Math.max(skills.length, 1);

  let score = Math.round(
    Math.min(ratio, 1) * 20
  );

  // General technical department bonus
  const departmentText =
    departments.join(" ");

  const technicalMatch = skills.some(
    (skill) =>
      semanticMatch(skill, departmentText)
  );

  if (technicalMatch && score === 0) {
    score = 10;
  }

  return {
    score: Math.min(score, 20),
    matches,
  };
};

// =====================================================
// CATEGORY SCORE
// MAX = 20
// =====================================================

const calculateCategoryScore = (
  category,
  researchAreas,
  departments
) => {
  const normalizedCategory =
    normalize(category);

  if (!normalizedCategory) {
    return 0;
  }

  const universityData = [
    ...researchAreas,
    ...departments,
  ];

  const matched = universityData.some(
    (item) =>
      semanticMatch(
        normalizedCategory,
        item
      )
  );

  return matched ? 20 : 0;
};

// =====================================================
// DISTRICT SCORE
// MAX = 15
// =====================================================

const calculateDistrictScore = (
  challengeDistrict,
  universityDistrict
) => {
  const challenge =
    normalize(challengeDistrict);

  const university =
    normalize(universityDistrict);

  if (!challenge || !university) {
    return 0;
  }

  return challenge === university
    ? 15
    : 0;
};

// =====================================================
// PRIORITY SCORE
// MAX = 10
// =====================================================

const calculatePriorityScore = (
  priority
) => {
  switch (normalize(priority)) {
    case "critical":
      return 10;

    case "high":
      return 8;

    case "medium":
      return 5;

    case "low":
      return 2;

    default:
      return 0;
  }
};

// =====================================================
// UNIVERSITY MATCH
// =====================================================

const calculateUniversityMatch = ({
  challenge,
  analysis,
  university,
}) => {
  const skills = normalizeArray(
    analysis?.recommendedSkills
  );

  const researchAreas = normalizeArray(
    university.researchAreas
  );

  const departments = normalizeArray(
    university.departments
  );

  const category =
    analysis?.category ||
    challenge.category;

  // Research
  const researchResult =
    calculateResearchScore(
      skills,
      researchAreas
    );

  // Departments
  const departmentResult =
    calculateDepartmentScore(
      skills,
      departments
    );

  // Category
  const categoryScore =
    calculateCategoryScore(
      category,
      researchAreas,
      departments
    );

  // District
  const districtScore =
    calculateDistrictScore(
      challenge.district,
      university.district
    );

  // Priority
  const priorityScore =
    calculatePriorityScore(
      challenge.priority
    );

  const totalScore =
    researchResult.score +
    departmentResult.score +
    categoryScore +
    districtScore +
    priorityScore;

  const reasons = [];

  if (researchResult.score > 0) {
    reasons.push(
      `Research relevance: ${researchResult.score}/35`
    );
  }

  if (departmentResult.score > 0) {
    reasons.push(
      `Department relevance: ${departmentResult.score}/20`
    );
  }

  if (categoryScore > 0) {
    reasons.push(
      `Category match: ${categoryScore}/20`
    );
  }

  if (districtScore > 0) {
    reasons.push(
      `Same district: ${districtScore}/15`
    );
  }

  if (priorityScore > 0) {
    reasons.push(
      `Priority contribution: ${priorityScore}/10`
    );
  }

  return {
    score: Math.min(totalScore, 100),

    matchedSkills: [
      ...new Set([
        ...researchResult.matches,
        ...departmentResult.matches,
      ]),
    ],

    breakdown: {
      researchArea: researchResult.score,
      department: departmentResult.score,
      category: categoryScore,
      district: districtScore,
      priority: priorityScore,
    },

    reasons,
  };
};

// =====================================================
// INDUSTRY MATCH
// =====================================================

const calculateIndustryMatch = ({
  challenge,
  analysis,
  industry,
}) => {
  const skills = normalizeArray(
    analysis?.recommendedSkills
  );

  const expertise = normalizeArray(
    industry.expertise
  );

  const category =
    analysis?.category ||
    challenge.category;

  const matchedSkills = [];

  for (const skill of skills) {
    const found = expertise.find(
      (item) =>
        semanticMatch(skill, item)
    );

    if (
      found &&
      !matchedSkills.includes(skill)
    ) {
      matchedSkills.push(skill);
    }
  }

  // Skill score
  const skillScore = Math.round(
    (
      matchedSkills.length /
      Math.max(skills.length, 1)
    ) * 55
  );

  // Category score
  const categoryMatch =
    semanticMatch(
      category,
      industry.industry
    ) ||
    expertise.some((item) =>
      semanticMatch(category, item)
    );

  const categoryScore =
    categoryMatch ? 25 : 0;

  // Priority
  const priorityScore =
    calculatePriorityScore(
      challenge.priority
    );

  const totalScore =
    skillScore +
    categoryScore +
    priorityScore;

  const reasons = [];

  if (skillScore > 0) {
    reasons.push(
      `Expertise relevance: ${skillScore}/55`
    );
  }

  if (categoryScore > 0) {
    reasons.push(
      `Industry/category relevance: ${categoryScore}/25`
    );
  }

  if (priorityScore > 0) {
    reasons.push(
      `Priority contribution: ${priorityScore}/10`
    );
  }

  return {
    score: Math.min(totalScore, 100),

    matchedSkills,

    breakdown: {
      expertise: skillScore,
      category: categoryScore,
      priority: priorityScore,
    },

    reasons,
  };
};

// =====================================================
// MAIN MATCHING FUNCTION
// =====================================================

const getMatchResults = async (
  challengeId
) => {
  const challenge =
    await prisma.challenge.findUnique({
      where: {
        id: challengeId,
      },

      include: {
        aiAnalysis: true,

        project: {
          include: {
            university: true,
            industry: true,
          },
        },
      },
    });

  if (!challenge) {
    throw new Error(
      "Challenge not found"
    );
  }

  // ---------------------------------------------------
  // IMPORTANT
  // ---------------------------------------------------

  if (!challenge.aiAnalysis) {
    const error = new Error(
      "Challenge has not been analyzed yet"
    );

    error.statusCode = 400;

    throw error;
  }

  const analysis =
    challenge.aiAnalysis;

  // ===================================================
  // UNIVERSITIES
  // ===================================================

  const universities =
    await prisma.university.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const universityMatches =
    universities
      .map((university) => {
        const result =
          calculateUniversityMatch({
            challenge,
            analysis,
            university,
          });

        return {
          universityId: university.id,
          universityName: university.name,
          district: university.district,
          description:
            university.description,

          researchAreas:
            university.researchAreas || [],

          departments:
            university.departments || [],

          matchScore: result.score,

          matchedSkills:
            result.matchedSkills,

          breakdown:
            result.breakdown,

          reasons:
            result.reasons,
        };
      })

      .sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      );

  const topUniversities =
    universityMatches
      .filter(
        (university) =>
          university.matchScore > 0
      )
      .slice(0, 5);

  // ===================================================
  // INDUSTRY PARTNERS
  // ===================================================

  const industries =
    await prisma.industryPartner.findMany({
      orderBy: {
        name: "asc",
      },
    });

  const industryMatches =
    industries
      .map((industry) => {
        const result =
          calculateIndustryMatch({
            challenge,
            analysis,
            industry,
          });

        return {
          industryId: industry.id,
          industryName: industry.name,
          industry: industry.industry,
          description:
            industry.description,

          expertise:
            industry.expertise || [],

          matchScore: result.score,

          matchedSkills:
            result.matchedSkills,

          breakdown:
            result.breakdown,

          reasons:
            result.reasons,
        };
      })

      .sort(
        (a, b) =>
          b.matchScore -
          a.matchScore
      );

  const topIndustries =
    industryMatches
      .filter(
        (industry) =>
          industry.matchScore > 0
      )
      .slice(0, 5);

  // ===================================================
  // SAVE RECOMMENDED UNIVERSITIES
  // ===================================================

  await prisma.aIAnalysis.update({
    where: {
      challengeId,
    },

    data: {
      recommendedUniversities:
        topUniversities.map(
          (university) =>
            university.universityName
        ),
    },
  });

  // ===================================================
  // RETURN
  // ===================================================

  return {
    challenge,

    analysis,

    universities:
      topUniversities,

    industries:
      topIndustries,

    bestUniversity:
      topUniversities[0] || null,

    bestIndustry:
      topIndustries[0] || null,
  };
};

module.exports = {
  calculateUniversityMatch,
  calculateIndustryMatch,
  getMatchResults,
};