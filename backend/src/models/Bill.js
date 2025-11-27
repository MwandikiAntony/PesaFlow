import mongoose from "mongoose";

const billSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  amount: Number,
  dueDate: Date,
  repeat: { type: String, enum: ["none", "monthly", "weekly"], default: "none" },
  lastReminderSent: Date
}, { timestamps: true });

export default mongoose.model("Bill", billSchema);
