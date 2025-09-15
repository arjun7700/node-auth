require("dotenv").config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const connectToDB = require("./database/db");
const authRoutes = require("./routes/auth-routes");
const homeRoutes = require("./routes/home-routes");
const adminRoutes = require("./routes/admin-routes");
const uploadImageRoutes = require("./routes/image-routes");

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json());

// serve static files from the "uploads" directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
app.use("/api/auth", authRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/image", uploadImageRoutes);

// test route
app.get("/", (req, res) => {
  res.send("🚀 API is running...");
});

const startServer = async () => {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(__dirname, "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir);
    }

    await connectToDB();
    app.listen(PORT, () => {
      console.log(`✅ Server is now listening on PORT ${PORT}`);
      console.log(`✅ Minimal server listening at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "❌ Failed to connect to the database. Server is not starting.",
      error
    );
    process.exit(1); // Exit the process with an error code
  }
};

startServer();
