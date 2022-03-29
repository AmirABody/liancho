const express = require("express");
const router = express.Router();
const { verifyUser, registerUser, loginUser, getMe } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", protect, getMe);
router.get("/verify/:id/:token", verifyUser);

module.exports = router;
