const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  protect,
} = require("../middleware/authMiddleware");

const router = express.Router();

// ==========================================
// PUBLIC AUTH ROUTES
// ==========================================

router.post(
  "/register",
  register
);

router.post(
  "/login",
  login
);

// ==========================================
// PROTECTED USER ROUTE
// ==========================================

router.get(
  "/me",
  protect,
  (req, res) => {
    return res.status(200).json({
      success: true,
      user: req.user,
    });
  }
);

module.exports = router;