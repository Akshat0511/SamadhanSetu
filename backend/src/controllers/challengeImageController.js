const prisma = require("../config/db");
const cloudinary = require("../config/cloudinary");
const { PassThrough } = require("stream");

// ==========================================
// UPLOAD BUFFER TO CLOUDINARY
// ==========================================

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "samadhansetu/challenges",
        resource_type: "image",
      },
      (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );

    const stream = new PassThrough();

    stream.end(buffer);

    stream.pipe(uploadStream);
  });
};

// ==========================================
// UPLOAD CHALLENGE IMAGES
// ==========================================

const uploadChallengeImages = async (req, res) => {
  try {
    const { id } = req.params;

    // ------------------------------------------
    // FIND CHALLENGE
    // ------------------------------------------

    const challenge = await prisma.challenge.findUnique({
      where: {
        id,
      },
    });

    if (!challenge) {
      return res.status(404).json({
        success: false,
        message: "Challenge not found",
      });
    }

    // ------------------------------------------
    // GET LOGGED-IN USER
    // ------------------------------------------

    const userId = req.user?.userId;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    // ------------------------------------------
    // ONLY OWNER CAN UPLOAD
    // ------------------------------------------

    if (challenge.userId !== userId) {
      return res.status(403).json({
        success: false,
        message: "You can only upload images to your own challenge",
      });
    }

    // ------------------------------------------
    // CHECK FILES
    // ------------------------------------------

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please select at least one image",
      });
    }

    // ------------------------------------------
    // MAX 5 IMAGES
    // ------------------------------------------

    if (req.files.length > 5) {
      return res.status(400).json({
        success: false,
        message: "Maximum 5 images are allowed",
      });
    }

    // ------------------------------------------
    // UPLOAD IMAGES
    // ------------------------------------------

    const uploadedImages = [];

    for (const file of req.files) {
      // Upload image to Cloudinary
      const result = await uploadToCloudinary(file.buffer);

      // Save image information in PostgreSQL
      const image = await prisma.challengeImage.create({
        data: {
          imageUrl: result.secure_url,
          publicId: result.public_id,
          challengeId: id,
        },
      });

      uploadedImages.push(image);
    }

    // ------------------------------------------
    // SUCCESS
    // ------------------------------------------

    return res.status(201).json({
      success: true,
      message: "Challenge images uploaded successfully",
      images: uploadedImages,
    });
  } catch (error) {
    console.error("UPLOAD CHALLENGE IMAGES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to upload challenge images",
      error: error.message,
    });
  }
};

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  uploadChallengeImages,
};