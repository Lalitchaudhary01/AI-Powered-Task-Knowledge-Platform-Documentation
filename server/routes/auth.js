const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");

// controllers import
const {
  register,
  login,
  verifyOtp, // ✅ correct
  logout,
} = require("../controllers/authController");

// public routes
router.post("/register", register);
router.post("/verify-email", verifyOtp); // ✅ match karega
router.post("/login", login);

// protected routes
router.post("/logout", auth, logout);

module.exports = router;
