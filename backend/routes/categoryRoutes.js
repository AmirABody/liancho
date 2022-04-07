const express = require("express");
const router = express.Router();
const {
  getCats,
  setCat,
  deleteCat
} = require("../controllers/categoryController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getCats).post(protect, setCat);
router.route("/:id").delete(protect, deleteCat);

module.exports = router;