import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    line_items: Object,
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    zipCode: { type: String },
    country: { type: String },
    paid: { type: Boolean },
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Order || mongoose.model("Order", orderSchema);
