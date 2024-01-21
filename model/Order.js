import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    line_items: Object,
    name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: Object,
    paid: { type: Boolean },
    size: { type: String },
    paid: { type: Boolean },
    status: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose?.models?.Order || mongoose.model("Order", orderSchema);
