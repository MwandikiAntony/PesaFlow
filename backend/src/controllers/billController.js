import Bill from "../models/Bill.js";

export const addBill = async (req, res) => {
  const bill = await Bill.create({
    userId: req.user.userId,
    ...req.body
  });

  res.json(bill);
};

export const getBills = async (req, res) => {
  const bills = await Bill.find({ userId: req.user.userId }).sort({ dueDate: 1 });
  res.json(bills);
};
