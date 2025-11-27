import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  category: String,
  amount: Number,
  note: String,
  date: { type: Date, default: Date.now }
}, { timestamps: true });

export default mongoose.model("Expense", expenseSchema);
