import { Timestamp } from "mongodb";
import mongoose, { model } from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamp: true }
);

export default mongoose?.models?.Categories ||
  mongoose.model("Category", CategoriesSchema);
