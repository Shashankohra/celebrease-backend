const express = require("express");
const app = express();

app.use(express.json());

const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

// Root
app.get("/", (req, res) => {
  res.send("Celebrease backend is running 🚀");
});