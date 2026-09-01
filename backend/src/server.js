const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");

dotenv.config();

const prisma = require("./config/db");

// ==========================================
// ROUTES
// ==========================================

const authRoutes = require("./routes/authRoutes");
const challengeRoutes = require("./routes/challengeRoutes");
const universityRoutes = require("./routes/universityRoutes");
const projectRoutes = require("./routes/projectRoutes");
const aiRoutes = require("./routes/aiRoutes");
const adminRoutes = require("./routes/adminRoutes");
const industryRoutes = require("./routes/industryRoutes");
const matchingRoutes = require("./routes/matchingRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// ==========================================
// APP
// ==========================================

const app = express();

// ==========================================
// SECURITY MIDDLEWARE
// ==========================================

app.use(helmet());

// ==========================================
// CORS
// ==========================================

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ==========================================
// BODY PARSER
// ==========================================

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// ==========================================
// AUTH ROUTES
// ==========================================

app.use(
  "/api/auth",
  authRoutes
);

// ==========================================
// APPLICATION ROUTES
// ==========================================

app.use(
  "/api/challenges",
  challengeRoutes
);

app.use(
  "/api/admin",
  adminRoutes
);

app.use(
  "/api/universities",
  universityRoutes
);

app.use(
  "/api/projects",
  projectRoutes
);

app.use(
  "/api/ai",
  aiRoutes
);

app.use(
  "/api/matching",
  matchingRoutes
);

app.use(
  "/api/recommendations",
  recommendationRoutes
);

app.use(
  "/api/industry-partners",
  industryRoutes
);

// ==========================================
// HEALTH CHECK
// ==========================================

app.get(
  "/api/health",
  async (req, res) => {
    try {
      await prisma.$queryRaw`
        SELECT 1
      `;

      return res.status(200).json({
        success: true,
        message:
          "SamadhanSetu API and Database are working",
      });
    } catch (error) {
      console.error(
        "HEALTH CHECK ERROR:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Database connection failed",
      });
    }
  }
);

// ==========================================
// 404 HANDLER
// ==========================================

app.use(
  (req, res) => {
    return res.status(404).json({
      success: false,
      message:
        `Route not found: ${req.method} ${req.originalUrl}`,
    });
  }
);

// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use(
  (error, req, res, next) => {
    console.error(
      "SERVER ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Internal server error",
    });
  }
);

// ==========================================
// START SERVER
// ==========================================

const PORT =
  process.env.PORT || 5000;

app.listen(
  PORT,
  () => {
    console.log(
      `🚀 Server running on http://localhost:${PORT}`
    );
  }
);