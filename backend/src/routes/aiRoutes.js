const express = require("express");

const {
  analyzeChallenge,
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// POST /api/ai/analyze/:id
router.post(
  "/analyze/:id",
  protect,
  analyzeChallenge
);

module.exports = router;