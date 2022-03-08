const express = require("express");
const router = express.Router();
const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, setTask);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask);

module.exports = router;
