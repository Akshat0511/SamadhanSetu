const express = require("express");

const {
  matchChallenge,
} = require("../controllers/matchingController");

const router = express.Router();

// GET /api/matching/:challengeId
router.get(
  "/:challengeId",
  matchChallenge
);

module.exports = router;