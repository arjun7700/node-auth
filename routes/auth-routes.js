const express = require("express");
const { registerUser, loginUser , changedPasswordController } = require("../controllers/auth-controller");
const router = express.Router();
const authMiddleware = require("../middleware/auth-middleware");

// all routes are related to authentication and autherization
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/change-password", changedPasswordController , authMiddleware);

module.exports = router;
