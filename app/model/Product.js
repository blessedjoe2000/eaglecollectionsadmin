import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: { true: "Enter title" } },
    description: {
      type: String,
    },
    price: { type: Number, required: { true: "Enter product price" } },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose?.models?.Product ||
  mongoose.model("Product", productSchema);