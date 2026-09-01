const express = require("express");

const {
  analyzeChallenge
} = require("../controllers/aiController");

const { protect } = require("../middleware/authMiddleware");



const router = express.Router();

router.post(
  "/analyze/:id",
  protect,
  analyzeChallenge
);

module.exports = router;