const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  usage: {
    type: String,
    enum: ["email-verification", "password-reset"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: function () {
      return this.usage === 'email-verification' ? '30d' : '1h'; 
    },
  },
});

module.exports = mongoose.model("Token", tokenSchema);
