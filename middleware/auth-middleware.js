//const jwt = require("jsonwebtoken");

// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   // check if token exists
//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     // verify the token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // attach user info to request
//     req.user = decoded;

//     next(); // continue to the next middleware / controller
//   } catch (error) {
//     return res
//       .status(401)
//       .json({ success: false, message: "Unauthorized: Invalid token" });
//   }
// };

// module.exports = authMiddleware;

const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized , please login to continue",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // attach user info to request
    req.userInfo = decoded;

    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
module.exports = authMiddleware;
