const express = require("express");
const app = express();

app.use(express.json());

// Import routes
const authRoutes = require("./routes/auth");

// ROOT (required for Railway)
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});

// Health route
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Mount API
app.use("/api", authRoutes);

// IMPORTANT: Railway binding
const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});