const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.get("/welcome", authMiddleware, (req, res) => {
  const { id, role, username, email } = req.userInfo;
  res.json({
    message: "Welcome to home page",
    user: {
      id,
      role,
      username,
      email,
    },
  });
});

// protected route
// router.get("/welcome", authMiddleware, (req, res) => {
//   res.json({ success: true, message: "Profile accessed", user: req.user });
// });
module.exports = router;
