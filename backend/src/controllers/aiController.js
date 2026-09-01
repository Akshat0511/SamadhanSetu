const prisma = require("../config/db");

// Analyze a challenge and create AIAnalysis
const analyzeChallenge = async (req, res) => {
  try {
    const { id } = req.params;

    const challenge = await prisma.challenge.findUnique({
      where: { id }
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found"
      });
    }

    const text =
      `${challenge.title} ${challenge.description} ${challenge.category}`
        .toLowerCase();

    let skills = [];
    let category = challenge.category;
    let priority = challenge.priority;

    // WATER
    if (
      text.includes("water") ||
      text.includes("drinking") ||
      text.includes("river") ||
      text.includes("irrigation")
    ) {
      category = "WATER";

      skills.push(
        "Water Management",
        "Water Quality Monitoring",
        "Environmental Engineering",
        "IoT"
      );
    }

    // AGRICULTURE
    if (
      text.includes("agriculture") ||
      text.includes("farmer") ||
      text.includes("crop") ||
      text.includes("farming")
    ) {
      category = "AGRICULTURE";

      skills.push(
        "Agriculture Technology",
        "IoT",
        "Data Analysis",
        "Environmental Engineering"
      );
    }

    // HEALTHCARE
    if (
      text.includes("health") ||
      text.includes("hospital") ||
      text.includes("medical")
    ) {
      category = "HEALTHCARE";

      skills.push(
        "Healthcare Technology",
        "Artificial Intelligence",
        "Data Analysis"
      );
    }

    // EDUCATION
    if (
      text.includes("education") ||
      text.includes("school") ||
      text.includes("student")
    ) {
      category = "EDUCATION";

      skills.push(
        "Education Technology",
        "Artificial Intelligence",
        "Web Development"
      );
    }

    // ENVIRONMENT
    if (
      text.includes("pollution") ||
      text.includes("waste") ||
      text.includes("environment") ||
      text.includes("sanitation")
    ) {
      category = "ENVIRONMENT";

      skills.push(
        "Environmental Engineering",
        "Waste Management",
        "IoT"
      );
    }

    // Remove duplicate skills
    skills = [...new Set(skills)];

    // Default skills
    if (skills.length === 0) {
      skills = [
        "Problem Solving",
        "Data Analysis",
        "Technology"
      ];
    }

    // Priority based on keywords
    if (
      text.includes("critical") ||
      text.includes("emergency") ||
      text.includes("death")
    ) {
      priority = "CRITICAL";
    } else if (
      text.includes("urgent") ||
      text.includes("shortage") ||
      text.includes("lack")
    ) {
      priority = "HIGH";
    }

    // Calculate simple impact score
    let impactScore = 60;

    if (challenge.affectedPopulation) {
      if (challenge.affectedPopulation > 10000) {
        impactScore = 95;
      } else if (challenge.affectedPopulation > 5000) {
        impactScore = 85;
      } else if (challenge.affectedPopulation > 1000) {
        impactScore = 75;
      }
    }

    // Find universities
    const universities = await prisma.university.findMany();

    const recommendedUniversities = universities
      .map((university) => {
        let score = 0;

        university.researchAreas.forEach((area) => {
          skills.forEach((skill) => {
            if (
              area.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(area.toLowerCase())
            ) {
              score += 20;
            }
          });
        });

        university.departments.forEach((department) => {
          skills.forEach((skill) => {
            if (
              department.toLowerCase().includes(skill.toLowerCase()) ||
              skill.toLowerCase().includes(department.toLowerCase())
            ) {
              score += 10;
            }
          });
        });

        // Same district bonus
        if (
          university.district.toLowerCase() ===
          challenge.district.toLowerCase()
        ) {
          score += 10;
        }

        score = Math.min(score, 100);

        return {
          id: university.id,
          name: university.name,
          district: university.district,
          matchScore: score
        };
      })
      .filter((u) => u.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore);

    // Save AI analysis
    const analysis = await prisma.aIAnalysis.upsert({
      where: {
        challengeId: challenge.id
      },
      update: {
        category,
        confidence: 0.90,
        priority,
        duplicateDetected: false,
        duplicateScore: 0,
        recommendedSkills: skills,
        recommendedUniversities:
          recommendedUniversities.map((u) => u.name),
        impactScore
      },
      create: {
        challengeId: challenge.id,
        category,
        confidence: 0.90,
        priority,
        duplicateDetected: false,
        duplicateScore: 0,
        recommendedSkills: skills,
        recommendedUniversities:
          recommendedUniversities.map((u) => u.name),
        impactScore
      }
    });

    return res.json({
      success: true,
      message: "Challenge analyzed successfully",
      analysis,
      recommendedUniversities
    });

  } catch (error) {
    console.error("AI ANALYSIS ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "AI analysis failed"
    });
  }
};

module.exports = {
  analyzeChallenge
};