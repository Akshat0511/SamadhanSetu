const express = require("express");

const {
  createIndustryPartner,
  getIndustryPartners
} = require("../controllers/industryController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, createIndustryPartner);

router.get("/", protect, getIndustryPartners);

module.exports = router;