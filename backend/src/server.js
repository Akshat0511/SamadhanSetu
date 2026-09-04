const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

// =========================
// MIDDLEWARE
// =========================

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without origin
      if (!origin) {
        return callback(null, true);
      }

      // Local frontend
      if (origin === "http://localhost:5173") {
        return callback(null, true);
      }

      // Vercel frontend
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =========================
// DATABASE
// =========================

const prisma = require("./config/db");

// =========================
// ROUTES
// =========================

const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const aiRoutes = require("./routes/aiRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// =========================
// API ROUTES
// =========================

app.use("/api/auth", authRoutes);
app.use("/api/challenges", challengeRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/recommendations", recommendationRoutes);

// =========================
// ROOT ROUTE
// =========================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SamadhanSetu Backend is running 🚀",
  });
});

// =========================
// HEALTH CHECK
// =========================

app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      success: true,
      message: "SamadhanSetu API and Database are working",
    });
  } catch (error) {
    console.error("Health Check Error:", error);

    res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
});

// =========================
// 404 HANDLER
// =========================

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// =========================
// ERROR HANDLER
// =========================

app.use((err, req, res, next) => {
  console.error("SERVER ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// =========================
// SERVER
// =========================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 SamadhanSetu Backend running on port ${PORT}`);
  console.log(`🌐 http://localhost:${PORT}`);
});