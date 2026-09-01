const prisma = require("../config/db");

// =====================================================
// Get Recommendations
// =====================================================

const getRecommendations = async (req, res) => {
  try {
    const { challengeId } = req.params;

    // ---------------------------------------------------
    // Validate
    // ---------------------------------------------------

    if (!challengeId) {
      return res.status(400).json({
        success: false,
        message: "challengeId is required"
      });
    }

    // ---------------------------------------------------
    // Get Challenge
    // ---------------------------------------------------

    const challenge =
      await prisma.challenge.findUnique({
        where: {
          id: challengeId
        },
        include: {
          aiAnalysis: true,
          project: {
            include: {
              university: true,
              industry: true
            }
          }
        }
      });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      });
    }

    // ---------------------------------------------------
    // AI Analysis Check
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

    // ---------------------------------------------------
    // Get Universities
    // ---------------------------------------------------

    const universities =
      await prisma.university.findMany();

    // ---------------------------------------------------
    // Get Industry Partners
    // ---------------------------------------------------

    const industryPartners =
      await prisma.industryPartner.findMany();

    // ---------------------------------------------------
    // Simple recommendation scoring
    // ---------------------------------------------------

    const skills =
      analysis.recommendedSkills || [];

    // ---------------------------------------------------
    // University Recommendations
    // ---------------------------------------------------

    const universityRecommendations =
      universities.map((university) => {
        let score = 0;

        const matchedSkills = [];

        const researchAreas =
          university.researchAreas || [];

        const departments =
          university.departments || [];

        for (const skill of skills) {
          const skillLower =
            String(skill).toLowerCase();

          const researchMatch =
            researchAreas.some((area) => {
              const areaLower =
                String(area).toLowerCase();

              return (
                areaLower.includes(skillLower) ||
                skillLower.includes(areaLower)
              );
            });

          if (researchMatch) {
            score += 20;

            if (!matchedSkills.includes(skill)) {
              matchedSkills.push(skill);
            }
          }

          const departmentMatch =
            departments.some((department) => {
              const departmentLower =
                String(department).toLowerCase();

              return (
                departmentLower.includes(skillLower) ||
                skillLower.includes(departmentLower)
              );
            });

          if (departmentMatch) {
            score += 10;

            if (!matchedSkills.includes(skill)) {
              matchedSkills.push(skill);
            }
          }
        }

        // District bonus
        if (
          String(university.district)
            .toLowerCase() ===
          String(challenge.district)
            .toLowerCase()
        ) {
          score += 15;
        }

        return {
          id: university.id,
          name: university.name,
          district: university.district,
          description:
            university.description,
          researchAreas:
            university.researchAreas,
          departments:
            university.departments,
          matchScore:
            Math.min(score, 100),
          matchedSkills
        };
      });

    // ---------------------------------------------------
    // Sort University Recommendations
    // ---------------------------------------------------

    universityRecommendations.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    // ---------------------------------------------------
    // Industry Recommendations
    // ---------------------------------------------------

    const industryRecommendations =
      industryPartners.map((partner) => {
        let score = 0;

        const matchedSkills = [];

        const expertise =
          partner.expertise || [];

        for (const skill of skills) {
          const skillLower =
            String(skill).toLowerCase();

          const expertiseMatch =
            expertise.some((item) => {
              const itemLower =
                String(item).toLowerCase();

              return (
                itemLower.includes(skillLower) ||
                skillLower.includes(itemLower)
              );
            });

          if (expertiseMatch) {
            score += 25;

            if (!matchedSkills.includes(skill)) {
              matchedSkills.push(skill);
            }
          }
        }

        // Industry/category matching
        const category =
          String(
            analysis.category ||
              challenge.category ||
              ""
          ).toLowerCase();

        const industry =
          String(
            partner.industry || ""
          ).toLowerCase();

        if (
          category &&
          industry.includes(category)
        ) {
          score += 20;
        }

        return {
          id: partner.id,
          name: partner.name,
          industry: partner.industry,
          description:
            partner.description,
          expertise:
            partner.expertise,
          matchScore:
            Math.min(score, 100),
          matchedSkills
        };
      });

    // ---------------------------------------------------
    // Sort Industry Recommendations
    // ---------------------------------------------------

    industryRecommendations.sort(
      (a, b) =>
        b.matchScore - a.matchScore
    );

    // ---------------------------------------------------
    // Best Matches
    // ---------------------------------------------------

    const bestUniversity =
      universityRecommendations.length > 0
        ? universityRecommendations[0]
        : null;

    const bestIndustry =
      industryRecommendations.length > 0
        ? industryRecommendations[0]
        : null;

    // ---------------------------------------------------
    // Top 5
    // ---------------------------------------------------

    const topUniversities =
      universityRecommendations
        .filter(
          (item) => item.matchScore > 0
        )
        .slice(0, 5);

    const topIndustryPartners =
      industryRecommendations
        .filter(
          (item) => item.matchScore > 0
        )
        .slice(0, 5);

    // ---------------------------------------------------
    // Save Recommended Universities
    // ---------------------------------------------------

    await prisma.aIAnalysis.update({
      where: {
        challengeId
      },
      data: {
        recommendedUniversities:
          topUniversities.map(
            (university) =>
              university.name
          )
      }
    });

    // ---------------------------------------------------
    // Response
    // ---------------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Recommendations generated successfully",

      challenge: {
        id: challenge.id,
        title: challenge.title,
        category: challenge.category,
        district: challenge.district,
        priority: challenge.priority,
        status: challenge.status
      },

      analysis: {
        category:
          analysis.category,
        confidence:
          analysis.confidence,
        priority:
          analysis.priority,
        recommendedSkills:
          analysis.recommendedSkills,
        impactScore:
          analysis.impactScore
      },

      bestUniversity,

      bestIndustry,

      universities:
        topUniversities,

      industryPartners:
        topIndustryPartners,

      existingProject:
        challenge.project || null
    });

  } catch (error) {
    console.error(
      "RECOMMENDATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to generate recommendations",
      error: error.message
    });
  }
};

module.exports = {
  getRecommendations
};