const express = require("express");
const app = express();

app.use(express.json());

// Routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// Root route (VERY IMPORTANT for Render)
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});