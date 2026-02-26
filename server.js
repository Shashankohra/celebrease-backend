require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const pool = require("./db");

app.use(cors());
app.use(express.json());

// ROOT ROUTE (THIS FIXES 404)
app.get("/", (req, res) => {
  res.send("Celebrease API is running 🚀");
});

// TEST ROUTE
app.get("/test", (req, res) => {
  res.send("Backend working ✅");
});

// Auth routes
app.use("/api/auth", require("./routes/auth"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server running on port", PORT));