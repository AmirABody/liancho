const express = require("express");
const router = express.Router();
const {
  verifyUser,
  registerUser,
  loginUser,
  getMe,
  sendPasswordReset,
  resetPassword,
} = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/verify/:userId/:token", verifyUser);
router.post("/password-reset", sendPasswordReset);
router.post("/password-reset/:userId/:token", resetPassword);

module.exports = router;
