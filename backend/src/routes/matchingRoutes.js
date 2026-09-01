const express = require("express");

const {
  matchChallenge
} = require("../controllers/matchingController");

const router = express.Router();

// =====================================================
// Match a challenge with universities and industry
// =====================================================
// GET /api/matching/:challengeId
router.get("/:challengeId", matchChallenge);

module.exports = router;