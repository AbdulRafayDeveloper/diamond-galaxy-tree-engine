import { required } from "joi";
import mongoose from "mongoose";

const withdrawerSchema = new mongoose.Schema(
  {
    withdrawGateways: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    screenshot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    postBalance: { type: Number, default: null },
  },
  {
    timestamps: true,
  }
);

export const Withdrawers =
  mongoose.models.withdrawers ||
  mongoose.model("withdrawers", withdrawerSchema);
