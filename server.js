const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");

// Root route (VERY IMPORTANT for Railway health check)
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server healthy"
  });
});

// Mount routes
app.use("/api", authRoutes);

// Railway PORT binding
const PORT = process.env.PORT || 5000;
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});