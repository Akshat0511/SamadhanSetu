const express = require("express");

const {
  createUniversity,
  getUniversities,
  getUniversityById
} = require("../controllers/universityController");


const { protect } = require("../middleware/authMiddleware");


const router = express.Router();

router.post("/", protect, createUniversity);

router.get("/", protect, getUniversities);

router.get("/:id", protect, getUniversityById);

module.exports = router;
