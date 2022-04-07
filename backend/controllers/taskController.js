const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

// @desc    Get tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id }).populate("category");

  res.status(200).json(tasks);
});

// @desc    Set task
// @route   POST /api/tasks
// @access  Private
const setTask = asyncHandler(async (req, res) => {
  let task;

  try {
    task = await Task.create({ userId: req.user.id, ...req.body, category: req.body.category._id });
  } catch (error) {
    res.status(400);
    throw error;
  }

  res.status(201).json(task);
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = asyncHandler(async (req, res) => {
  let task;

  if (mongoose.Types.ObjectId.isValid(req.params.id)) task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Make sure the logged in user matches the task user
  if (task.userId.toString() !== req.user?.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  let updatedTask;

  try {
    updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
  } catch (error) {
    res.status(400);
    throw error;
  }

  res.status(200).json(updatedTask);
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = asyncHandler(async (req, res) => {
  let task;

  if (mongoose.Types.ObjectId.isValid(req.params.id)) task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error("Task not found");
  }

  // Make sure the logged in user matches the task user
  if (task.userId.toString() !== req.user?.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  await task.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getTasks, setTask, updateTask, deleteTask };
