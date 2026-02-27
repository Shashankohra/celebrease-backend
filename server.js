const express = require("express");
const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});

// Health check (optional but recommended)
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// Railway PORT (IMPORTANT)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});