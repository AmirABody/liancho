const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

const Category = require("../models/categoryModel");

// @desc    Get categories
// @route   GET /api/cats
// @access  Private
const getCats = asyncHandler(async (req, res) => {
  const cats = await Category.find({ userId: req.user.id });

  res.status(200).json(cats);
});

// @desc    Set category
// @route   POST /api/cats
// @access  Private
const setCat = asyncHandler(async (req, res) => {
  let cat;

  try {
    cat = await Category.create({ userId: req.user.id, ...req.body });
  } catch (error) {
    res.status(400);
    throw error;
  }

  res.status(201).json(cat);
});

// @desc    Delete category
// @route   DELETE /api/cats/:id
// @access  Private
const deleteCat = asyncHandler(async (req, res) => {
  let cat;

  if (mongoose.Types.ObjectId.isValid(req.params.id))
    cat = await Category.findById(req.params.id);

  if (!cat) {
    res.status(400);
    throw new Error("Category not found");
  }

  // Make sure the logged in user matches the cat user
  if (cat.userId.toString() !== req.user?.id) {
    res.status(401);
    throw new Error("User not authorized!");
  }

  await cat.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = { getCats, setCat, deleteCat };
