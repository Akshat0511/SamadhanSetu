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

const { protect } = require("../middleware/authMiddleware");

const upload = require("../middleware/upload");

const router = express.Router();

// ==========================================
// CHALLENGES
// ==========================================

router.get("/", getChallenges);

// IMPORTANT: /my must come before /:id
router.get("/my", protect, getMyChallenges);

router.get("/:id", getChallengeById);

router.post("/", protect, createChallenge);

// ==========================================
// CHALLENGE IMAGE UPLOAD
// ==========================================

router.post(
  "/:id/images",
  protect,
  upload.array("images", 5),
  uploadChallengeImages
);

// ==========================================
// STATUS
// ==========================================

router.put(
  "/:id/status",
  protect,
  updateChallengeStatus
);

module.exports = router;