// controllers/auth.controller.js
const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../config/nodemailer");

// Temporary OTP store (in-memory)
const otpStore = {};

const register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  try {
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedPassword = await bcrypt.hash(password, 10);

    // Store temporarily
    otpStore[email] = {
      otp,
      expiry: Date.now() + 10 * 60 * 1000,
      userData: { name, email, password: hashedPassword },
    };

    // Send OTP to email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 10 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const verifyOtp = async (req, res) => {
  const { otp, email } = req.body;
  try {
    const record = otpStore[email];
    if (!record) {
      return res
        .status(400)
        .json({ message: "No OTP request found for this email" });
    }
    if (record.expiry < Date.now()) {
      delete otpStore[email];
      return res.status(400).json({ message: "OTP has expired" });
    }
    if (record.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Save user in DB
    const newUser = new userModel({
      name: record.userData.name,
      email: record.userData.email,
      password: record.userData.password,
      isVerified: true,
    });
    await newUser.save();

    // Clean up
    delete otpStore[email];

    // Generate JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User verified & registered successfully!",
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    if (!user.isVerified) {
      return res.status(400).json({ error: "Please verify your email first" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ message: "User logged in successfully!", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const logout = (req, res) => {
  // For JWT logout: just clear token from client-side
  res.json({ message: "User logged out successfully!" });
};

module.exports = { register, verifyOtp, login, logout };
