import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: { true: "Enter title" } },
    description: {
      type: String,
    },
    price: { type: Number, required: { true: "Enter product price" } },
    images: [{ type: String }],
    category: Array,
    newPrice: { type: Number },
    colors: { type: String },
    sizes: { type: String },
  },
  { timestamps: true }
);

export default mongoose?.models?.Product ||
  mongoose.model("Product", productSchema);
