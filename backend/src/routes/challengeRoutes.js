const express = require("express");

const {
  getChallenges,
  getChallengeById,
  createChallenge,
  updateChallengeStatus,
  getMyChallenges,
} = require("../controllers/challengeController");

const {
  uploadChallengeImages,
} = require("../controllers/challengeImageController");

const protect = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

// Get all challenges
router.get("/", getChallenges);

// Get logged-in user's challenges
router.get("/my", protect, getMyChallenges);

// Get single challenge
router.get("/:id", getChallengeById);

// Create challenge
router.post("/", protect, createChallenge);

// Upload challenge images
router.post(
  "/:id/images",
  protect,
  upload.array("images", 5),
  uploadChallengeImages
);

// Update challenge status
router.put("/:id/status", protect, updateChallengeStatus);

module.exports = router;