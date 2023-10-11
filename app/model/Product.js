import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: { true: "Enter title" } },
    description: {
      type: String,
    },
    price: { type: Number, required: { true: "Enter product price" } },
    images: [{ type: String }],
    category: { type: mongoose.Types.ObjectId, ref: "Category" },
    properties: { type: Object },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Product ||
  mongoose.model("Product", productSchema);
