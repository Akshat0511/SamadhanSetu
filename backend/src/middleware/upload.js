const multer = require("multer");

// ==========================================
// MEMORY STORAGE
// ==========================================

const storage = multer.memoryStorage();

// ==========================================
// FILE FILTER
// ==========================================

const fileFilter = (req, file, cb) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed"), false);
  }
};

// ==========================================
// MULTER CONFIGURATION
// ==========================================

const upload = multer({
  storage,

  limits: {
    // Maximum size = 5 MB per image
    fileSize: 5 * 1024 * 1024,

    // Maximum 5 files in one request
    files: 5,
  },

  fileFilter,
});

// ==========================================
// EXPORT
// ==========================================

module.exports = upload;