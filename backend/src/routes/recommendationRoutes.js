const express = require("express");

const {
  getRecommendations,
} = require("../controllers/recommendationController");

const router = express.Router();

// GET /api/recommendations/challenges/:challengeId
router.get(
  "/challenges/:challengeId",
  getRecommendations
);

module.exports = router;