import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  name: String,
  number: String
}, { timestamps: true });

export default mongoose.model("Favorite", favSchema);
