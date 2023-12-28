import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
  },
  { timestamp: true }
);

export default mongoose?.models?.Category ||
  mongoose.model("Category", CategoriesSchema);
