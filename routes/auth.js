const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");

// SEND OTP
router.post("/send-otp", async (req, res) => {
  const { mobile } = req.body;

  if (!mobile) {
    return res.status(400).json({ msg: "Mobile required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  await pool.query(
    "INSERT INTO otps (mobile, otp, expires_at) VALUES ($1,$2,$3)",
    [mobile, otp, expires]
  );

  console.log("OTP:", otp); // For testing

  res.json({ msg: "OTP sent", otp }); // remove otp in production
});

// VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  const { mobile, otp } = req.body;

  const result = await pool.query(
    "SELECT * FROM otps WHERE mobile=$1 AND otp=$2 ORDER BY id DESC LIMIT 1",
    [mobile, otp]
  );

  if (result.rows.length === 0) {
    return res.status(400).json({ msg: "Invalid OTP" });
  }

  const record = result.rows[0];

  if (new Date(record.expires_at) < new Date()) {
    return res.status(400).json({ msg: "OTP expired" });
  }

  // Check user exists
  let user = await pool.query("SELECT * FROM users WHERE mobile=$1", [mobile]);

  if (user.rows.length === 0) {
    user = await pool.query(
      "INSERT INTO users (mobile) VALUES ($1) RETURNING *",
      [mobile]
    );
  }

  const token = jwt.sign(
    { id: user.rows[0].id, mobile },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token, user: user.rows[0] });
});

module.exports = router;