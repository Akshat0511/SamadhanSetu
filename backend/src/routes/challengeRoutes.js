const express = require("express");

const router = express.Router();

const {
  createChallenge,
  getChallenges,
  getChallengeById,
  updateChallengeStatus,
  getMyChallenges,
} = require("../controllers/challengeController");

const { protect } = require("../middleware/authMiddleware");

// =====================================================
// PUBLIC ROUTES
// =====================================================

// Get all challenges
router.get("/", getChallenges);

// Get single challenge
router.get("/:id", getChallengeById);


// =====================================================
// PROTECTED ROUTES
// =====================================================

// Create challenge
router.post("/", protect, createChallenge);

// Get logged-in user's challenges
router.get("/my", protect, getMyChallenges);

// Update challenge status
router.put("/:id/status", protect, updateChallengeStatus);

module.exports = router;