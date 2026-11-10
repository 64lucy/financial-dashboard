
const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  amount: {
    type: Number,
    required: true,
    min: [0.01, "Amount must be greater than zero"]
  },
  type: {
    type: String,
    required: true,
    enum: ["Income", "Expense"]
  },
  date: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Transaction", transactionSchema);