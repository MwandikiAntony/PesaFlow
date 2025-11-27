import Expense from "../models/Expense.js";

export const addExpense = async (req, res) => {
  const { category, amount, note } = req.body;

  const exp = await Expense.create({
    userId: req.user.userId,
    category,
    amount,
    note
  });

  res.json(exp);
};

export const getExpenses = async (req, res) => {
  const list = await Expense.find({ userId: req.user.userId }).sort({ date: -1 });
  res.json(list);
};
