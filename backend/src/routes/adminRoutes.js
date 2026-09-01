const express = require("express");

const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createIndustryPartner,
  getIndustryPartners
} = require("../controllers/industryController");
const { getAllChallenges } = require("../controllers/adminController");

console.log("ADMIN protect:", typeof protect);
console.log("ADMIN getAllChallenges:", typeof getAllChallenges);

router.get("/challenges", protect, getAllChallenges);
router.post(
  "/industry-partners",
  protect,
  createIndustryPartner
);

router.get(
  "/industry-partners",
  protect,
  getIndustryPartners
);

module.exports = router;