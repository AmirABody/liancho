const fs = require("fs/promises");
const path = require("path");
const bcrypt = require("bcryptjs");
const Handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const crypto = require("crypto");
const MyError = require("../errors/MyError");
const ERRORS = require("../errors/ERRORS");
const sendEmail = require("../utils/emails/email");

const User = require("../models/userModel");
const Token = require("../models/tokenModel");

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
  await sendEmail(user.email, "LianCho Account Email Verification", { text: link });

  res.status(201).send("An Email is sent to your account, please verify.");
});

// @desc    Verify user email
// @route   POST /api/users/verify/:userId/:token
// @access  Public
const verifyUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

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

  // Verify user
  // await User.updateOne({ _id: user._id, verified: true });
  user.verified = true;
  await user.save();

  // Delete Token
  // await Token.findByIdAndRemove(token._id);
  await token.remove();

  res.status(200).send("Email verified successfully");
});

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password, remindMe } = req.body;

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
    // if remindMe === true, then token and cookie will expire after 1 year
    // otherwise token will last for 1 day and cookie will become a session cookie
    const token = generateToken(user._id, remindMe ? "365d" : "1d");

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: true,
      ...(remindMe && { maxAge: 365 * 24 * 60 * 60 }),
    });
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new MyError(ERRORS[1003]);
  }
});

// @desc    Logout a user
// @route   POST /api/users/logout
// @access  Private
const logoutUser = asyncHandler(async (req, res) => {
  res.clearCookie("access_token").status(200).json({ message: "Successfully logged out!" });
});

// @desc    Send password reset form
// @route   POST /api/users/password-reset
// @access  Public
const sendPasswordReset = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    res.status(400);
    throw new MyError(ERRORS[1002]);
  }

  let token = await Token.findOne({ userId: user._id, usage: "password-reset" });
  if (!token) {
    token = await Token.create({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
      usage: "password-reset",
    });
  }

  // Password reset link
  const link = `${process.env.BASE_URL}/password-reset/${user._id}/${token.token}`;

  // Create form using handlebars
  const passwordResetForm = await createPasswordResetForm(link);

  // Send password reset email
  await sendEmail(user.email, "LianCho Password Reset", { html: passwordResetForm });

  res.status(200).send("Password reset email is sent successfully!");
});

// @desc    Reset password
// @route   POST /api/users/password-reset/:userId/:token
// @access  Public
const resetPassword = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);

  if (!user) {
    res.status(400);
    throw new Error("Invalid link or expired!");
  }

  const token = await Token.findOne({
    userId: user._id,
    token: req.params.token,
    usage: "password-reset",
  });

  if (!token) {
    res.status(400);
    throw new Error("Invalid link or expired!");
  }

  // Validate input password and confirm password
  let { password, confirmPassword } = req.body;
  if (!password || !confirmPassword) {
    res.status(400);
    return res.send("One of password fields is empty!");
  }
  if (password !== confirmPassword) {
    res.status(400);
    return res.send("Two input passwords were not equal!");
  }

  // Hash password
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Update password
  user.password = hashedPassword;
  await user.save();

  // Delete token
  await token.remove();

  res.status(200).send("Password reset successfully!");
});

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generate JWT
const generateToken = (id, expiresIn) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn });
};

const createPasswordResetForm = async (passwordResetLink) => {
  let templatePath = path.join(__dirname, "..", "utils", "emails", "templates", "resetPassword.hbs");
  return fs.readFile(templatePath).then((templateBuffer) => {
    const template = Handlebars.compile(templateBuffer.toString(), "utf-8");
    return template({ passwordResetLink });
  });
};

module.exports = {
  registerUser,
  verifyUser,
  loginUser,
  logoutUser,
  sendPasswordReset,
  resetPassword,
  getMe,
};
