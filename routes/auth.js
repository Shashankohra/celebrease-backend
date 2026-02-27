const express = require("express");
const router = express.Router();

// TEMP in-memory store (replace with DB later)
let otpStore = {};

// ---------------------
// SEND OTP
// ---------------------
router.post("/send-otp", (req, res) => {
  const { mobile } = req.body;

  if (!mobile || mobile.length !== 10) {
    return res.status(400).json({
      success: false,
      message: "Invalid mobile number"
    });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();

  otpStore[mobile] = otp;

  console.log(`OTP for ${mobile}: ${otp}`);

  res.json({
    success: true,
    message: "OTP sent successfully",
    otp // remove in production
  });
});

// ---------------------
// VERIFY OTP
// ---------------------
router.post("/verify-otp", (req, res) => {
  const { mobile, otp } = req.body;

  if (!otpStore[mobile]) {
    return res.status(400).json({
      success: false,
      message: "OTP not found"
    });
  }

  if (otpStore[mobile] !== otp) {
    return res.status(400).json({
      success: false,
      message: "Invalid OTP"
    });
  }

  delete otpStore[mobile];

  res.json({
    success: true,
    message: "OTP verified successfully"
  });
});

module.exports = router;