const Expense = require("../models/expense");
const Debt = require("../models/debt");
exports.create = async (req, res, next) => {
  const { group } = req.query;
  const { name, totalAmount, user, category, message } = req.body;
  user.push(req.userId);
  if (group === "true") {
    const expense = await Expense.create({
      isGroup: true,
      user,
      name,
      admin: req.userId,
      totalAmount,
      amount: Math.ceil(totalAmount / user.length),
      message,
      category,
    });

    for (let i = 0; i < user.length - 1; i++) {
      await Debt.create({
        amount: Math.ceil(totalAmount / user.length),
        expense: expense._id,
        user: user[i],
      });
    }
    res.json(expense);
  } else if (group === "false") {
    const expense = await Expense.create({
      isGroup: false,
      user: user,
      admin: req.userId,
      name,
      message,
      totalAmount,
      amount: Math.ceil(totalAmount / user.length),
    });
    const debt = await Debt.create({
      amount: Math.ceil(totalAmount / user.length),
      expense: expense._id,
      user: user[0],
    });
    res.json({ expense, debt });
  }
};
exports.getExpenses = async (req, res, next) => {
  const expenses = await Expense.find({
    user: req.userId,
  })
    .populate("user", { name: 1, email: 1 })
    .populate("admin", { name: 1, email: 1 });
  res.json(expenses);
};
