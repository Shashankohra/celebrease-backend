const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});

// Health
app.get("/health", (req, res) => {
  res.json({ status: "OK" });
});

// ✅ DO NOT CHANGE THIS
const PORT = process.env.PORT || 5000;

// ✅ VERY IMPORTANT
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});