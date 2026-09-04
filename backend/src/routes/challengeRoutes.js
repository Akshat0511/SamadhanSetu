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

/*
=====================================================
GET ALL CHALLENGES
=====================================================
*/
router.get("/", getChallenges);

/*
=====================================================
GET MY CHALLENGES
IMPORTANT: MUST COME BEFORE /:id
=====================================================
*/
router.get("/my", protect, getMyChallenges);

/*
=====================================================
GET SINGLE CHALLENGE
=====================================================
*/
router.get("/:id", getChallengeById);

/*
=====================================================
CREATE CHALLENGE
=====================================================
*/
router.post(
  "/",
  protect,
  createChallenge
);

/*
=====================================================
UPLOAD CHALLENGE IMAGES
POST /api/challenges/:id/images
=====================================================
*/
router.post(
  "/:id/images",
  protect,
  upload.array("images", 5),
  uploadChallengeImages
);

/*
=====================================================
UPDATE CHALLENGE STATUS
=====================================================
*/
router.put(
  "/:id/status",
  protect,
  updateChallengeStatus
);

module.exports = router;