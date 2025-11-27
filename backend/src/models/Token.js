import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  meterNumber: String,
  lastUnits: Number,
  lastPurchaseDate: Date
}, { timestamps: true });

export default mongoose.model("Token", tokenSchema);
