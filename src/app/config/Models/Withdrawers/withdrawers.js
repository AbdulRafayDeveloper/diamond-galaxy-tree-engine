import mongoose from "mongoose";

const withdrawerSchema = new mongoose.Schema(
  {
    withdrawGateways: { type: String, required: true },
    amount: { type: Number, required: true },
    address: { type: String, required: true },
    screenshot: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Withdrawers =
  mongoose.models.withdrawers ||
  mongoose.model("withdrawers", withdrawerSchema);
