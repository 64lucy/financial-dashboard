
const mongoose = require("mongoose");

const budgetSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
    unique: true
  },
  limit: {
    type: Number,
    required: true,
    min: 0.01
  },
  spent: {
    type: Number,
    required: true,
    default: 0
  }
});

module.exports = mongoose.model("Budget", budgetSchema);