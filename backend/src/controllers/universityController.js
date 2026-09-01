const prisma = require("../config/db");

// Create University
const createUniversity = async (req, res) => {
  try {
    const {
      name,
      district,
      description,
      researchAreas,
      departments
    } = req.body;

    if (!name || !district) {
      return res.status(400).json({
        success: false,
        message: "University name and district are required"
      });
    }

    const university = await prisma.university.create({
      data: {
        name,
        district,
        description: description || null,
        researchAreas: researchAreas || [],
        departments: departments || []
      }
    });

    res.status(201).json({
      success: true,
      message: "University created successfully",
      university
    });

  } catch (error) {
    console.error("CREATE UNIVERSITY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create university"
    });
  }
};


// Get All Universities
const getUniversities = async (req, res) => {
  try {
    const universities = await prisma.university.findMany({
      orderBy: {
        name: "asc"
      }
    });

    res.json({
      success: true,
      count: universities.length,
      universities
    });

  } catch (error) {
    console.error("GET UNIVERSITIES ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch universities"
    });
  }
};


// Get University By ID
const getUniversityById = async (req, res) => {
  try {
    const { id } = req.params;

    const university = await prisma.university.findUnique({
      where: {
        id
      },
      include: {
        projects: true
      }
    });

    if (!university) {
      return res.status(404).json({
        success: false,
        message: "University not found"
      });
    }

    res.json({
      success: true,
      university
    });

  } catch (error) {
    console.error("GET UNIVERSITY ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch university"
    });
  }
};


module.exports = {
  createUniversity,
  getUniversities,
  getUniversityById
};