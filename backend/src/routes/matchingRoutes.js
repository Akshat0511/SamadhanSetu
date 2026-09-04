const express = require("express");

const {
  matchChallenge,
} = require("../controllers/matchingController");

const router = express.Router();

router.get(
  "/:challengeId",
  matchChallenge
);

module.exports = router;