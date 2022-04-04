const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      required: true,
    },
    title: { type: String, required: true },
    category: { type: String, required: true },
    dueDate: { type: Date, required: true },
    reminder: { type: Boolean, required: true },
    time: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", taskSchema);
