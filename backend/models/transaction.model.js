const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  senderUpiId: String,
  receiverUpiId: String,
  amount: Number,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Transaction", transactionSchema);
