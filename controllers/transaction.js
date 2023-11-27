const Transaction = require("../models/transaction");
const Debt = require("../models/debt");
exports.getTransactions = async (req, res, next) => {
  let transaction = await Transaction.find({ user: req.userId }).populate({
    path: "expense",
    populate: {
      path: "admin",
    },
  });

  res.json(transaction);
};
exports.getDebts = async (req, res, next) => {
  const debts = await Debt.find({ user: req.userId }).populate("expense");
  res.json(debts);
};
exports.create = async (req, res, next) => {
  const { amount, expense, debt } = req.body;
  console.log("first");
  let transaction = await Transaction.create({
    amount,
    expense,
    user: req.userId,
  });
  transaction = await transaction.populate({
    path: "expense",
    populate: {
      path: "admin",
    },
  });
  if (debt) await Debt.findByIdAndDelete(debt);
  else await Debt.findOneAndDelete({ expense, user: req.userId });
  res.json(transaction);
};
