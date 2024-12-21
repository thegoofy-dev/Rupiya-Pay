const User = require("../models/user.model");
const Transaction = require("../models/transaction.model");

// Transaction
exports.createTransaction = async (req, res) => {
  const { senderUpiId, receiverUpiId, amount } = req.body;
  try {
    const sender = await User.findOne({ upiId: senderUpiId });
    const receiver = await User.findOne({ upiId: receiverUpiId });

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Invalid UPI IDs" });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance" });
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save();
    await receiver.save();

    const newTransaction = new Transaction({ senderUpiId, receiverUpiId, amount });
    await newTransaction.save();

    res.status(200).json({ message: "Transaction successful" });
  } catch (error) {
    res.status(500).json({ error: "Transaction failed" });
  }
};
