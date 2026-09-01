const express = require("express");

const router = express.Router();

const {
  getRecommendations
} = require("../controllers/recommendationController");

// =====================================================
// Get Recommendations
// =====================================================
//
// GET
// /api/recommendations/challenges/:challengeId
//
// =====================================================

router.get(
  "/challenges/:challengeId",
  getRecommendations
);

module.exports = router;