
const jwt = require("jsonwebtoken");

// =====================================================
// PROTECT ROUTES
// =====================================================

const protect = (req, res, next) => {
  try {
    // ===================================================
    // CHECK JWT SECRET
    // ===================================================

    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing in .env"
      );

      return res.status(500).json({
        success: false,
        message:
          "Server authentication configuration error",
      });
    }

    // ===================================================
    // GET AUTHORIZATION HEADER
    // ===================================================

    const authHeader =
      req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // ===================================================
    // CHECK BEARER FORMAT
    // ===================================================

    if (
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid authorization format",
      });
    }

    // ===================================================
    // EXTRACT TOKEN
    // ===================================================

    const token =
      authHeader.slice(7).trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "No token provided",
      });
    }

    // ===================================================
    // VERIFY TOKEN
    // ===================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log(
      "JWT DECODED USER:",
      decoded
    );

    // ===================================================
    // CHECK USER ID
    // ===================================================

    /*
      Your challengeController uses:

      req.user.userId

      Therefore we make sure userId exists.
    */

    const userId =
      decoded.userId ||
      decoded.id ||
      decoded.user_id;

    if (!userId) {
      console.error(
        "JWT does not contain user ID:",
        decoded
      );

      return res.status(401).json({
        success: false,
        message:
          "Invalid token: user ID not found",
      });
    }

    // ===================================================
    // SAVE AUTHENTICATED USER
    // ===================================================

    req.user = {
      ...decoded,
      userId: userId,
    };

    console.log(
      "AUTHENTICATED USER ID:",
      req.user.userId
    );

    // ===================================================
    // CONTINUE
    // ===================================================

    next();

  } catch (error) {
    console.error(
      "AUTH ERROR:",
      error.message
    );

    // ===================================================
    // TOKEN EXPIRED
    // ===================================================

    if (
      error.name ===
      "TokenExpiredError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Token has expired. Please login again.",
      });
    }

    // ===================================================
    // INVALID TOKEN
    // ===================================================

    if (
      error.name ===
      "JsonWebTokenError"
    ) {
      return res.status(401).json({
        success: false,
        message:
          "Invalid token. Please login again.",
      });
    }

    // ===================================================
    // OTHER AUTH ERROR
    // ===================================================

    return res.status(401).json({
      success: false,
      message:
        "Authentication failed",
    });
  }
};

module.exports = {
  protect,
};

