const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const isAdminUser = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const { uploadImage, fetchImagesController } = require("../controllers/image-controller");
const router = express.Router();

// upload the image
router.post(
  "/uploads",
  authMiddleware,
  isAdminUser,
  uploadMiddleware.single("image"),
  uploadImage
);

// to get all the image
router.get("/get", authMiddleware, fetchImagesController);
module.exports = router;