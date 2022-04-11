const express = require("express");
const router = express.Router();
const { getTasks, setTask, updateTask, deleteTask, deleteTasks } = require("../controllers/taskController");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getTasks).post(protect, setTask).delete(protect, deleteTasks);
router.route("/:id").put(protect, updateTask).delete(protect, deleteTask)

module.exports = router;
