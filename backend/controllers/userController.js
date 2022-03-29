// const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const MyError = require("../errors/MyError");
const ERRORS = require("../errors/ERRORS");
const sendEmail = require("../utils/email");

const User = require("../models/userModel");
const Token = require("../models/tokenModel");

// @desc    ٰVerify user email
// @route   POST /api/users/verify/:id/:token
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findOne({ _id: req.params.id });

  if (!user) {
    res.status(400);
    throw new Error("Invalid link");
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
    usage: "email-verification",
  });

  if (!token) {
    res.status(400);
    throw new Error("Invalid link");
  }

  await User.updateOne({ _id: user._id, verified: true });

  await Token.findByIdAndRemove(token._id);

  res.status(200).send("Email verified successfully");
});

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    res.status(400);
    throw new Error("Please add all required fields!");
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new MyError(ERRORS[1001]);
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    fullName,
    email,
    password: hashedPassword,
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid user data");
  }

  // Create token for email verification
  const token = await Token.create({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
    usage: "email-verification",
  });

  // Email verification link
  const link = `${process.env.BASE_URL}/verify/${user._id}/${token.token}`;

  // Send verification email
  await sendEmail(user.email, "LianCho Account Email Verification", link);

  res.status(201).send("An Email is sent to your account, please verify.");
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    res.status(400);
    throw new MyError(ERRORS[1002]);
  }

  if (!user.verified) {
    res.status(401);
    throw new MyError(ERRORS[1004]);
  }

  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new MyError(ERRORS[1003]);
  }
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

module.exports = {
  verifyUser,
  registerUser,
  loginUser,
  getMe,
};
