import mongoose from "mongoose";

const CategoriesSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    parent: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: [
      {
        name: { type: String },
        values: [{ type: String }],
      },
    ],
  },
  { timestamp: true }
);

export default mongoose?.models?.Category ||
  mongoose.model("Category", CategoriesSchema);
