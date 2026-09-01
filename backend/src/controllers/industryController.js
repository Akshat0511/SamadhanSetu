const prisma = require("../config/db");

// Add Industry Partner
const createIndustryPartner = async (req, res) => {
  try {
    const {
      name,
      industry,
      expertise,
      description
    } = req.body;

    if (!name || !industry || !expertise) {
      return res.status(400).json({
        success: false,
        message: "Name, industry and expertise are required"
      });
    }

    const partner = await prisma.industryPartner.create({
      data: {
        name,
        industry,
        expertise,
        description: description || null
      }
    });

    res.status(201).json({
      success: true,
      message: "Industry partner created successfully",
      partner
    });

  } catch (error) {
    console.error("CREATE INDUSTRY PARTNER ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create industry partner"
    });
  }
};


// Get all Industry Partners
const getIndustryPartners = async (req, res) => {
  try {
    const partners = await prisma.industryPartner.findMany({
      orderBy: {
        name: "asc"
      }
    });

    res.json({
      success: true,
      count: partners.length,
      partners
    });

  } catch (error) {
    console.error("GET INDUSTRY PARTNERS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to get industry partners"
    });
  }
};


module.exports = {
  createIndustryPartner,
  getIndustryPartners
};