const express = require("express");

const {
  createProject,
  getProjects,
  getProjectById,
  addProjectMember,
  removeProjectMember,
  createMilestone,
  getProjectMilestones,
  updateMilestone,
  updateProjectProgress
} = require("../controllers/projectController");

const { protect } = require("../middleware/authMiddleware");


const router = express.Router();


// ======================================================
// PROJECT
// ======================================================

// Create project
router.post(
  "/",
  protect,
  createProject
);

// Get all projects
router.get(
  "/",
  protect,
  getProjects
);


// ======================================================
// MILESTONES
// IMPORTANT: These must come before /:projectId
// ======================================================

// Create milestone
router.post(
  "/:projectId/milestones",
  protect,
  createMilestone
);

// Get project milestones
router.get(
  "/:projectId/milestones",
  protect,
  getProjectMilestones
);

// Update milestone
router.put(
  "/milestones/:milestoneId",
  protect,
  updateMilestone
);


// ======================================================
// MEMBERS
// ======================================================

// Add member
router.post(
  "/:projectId/members",
  protect,
  addProjectMember
);

// Remove member
router.delete(
  "/:projectId/members/:userId",
  protect,
  removeProjectMember
);


// ======================================================
// PROJECT PROGRESS
// ======================================================

router.put(
  "/:projectId/progress",
  protect,
  updateProjectProgress
);


// ======================================================
// GET SINGLE PROJECT
// Keep this AFTER specific routes
// ======================================================

router.get(
  "/:projectId",
  protect,
  getProjectById
);


module.exports = router;