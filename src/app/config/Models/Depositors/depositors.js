import mongoose from "mongoose";

const depositorSchema = new mongoose.Schema(
  {
    paymentMethod: { type: String, required: true },
    amount: { type: Number, required: true },
    image: { type: String, required: true },
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

export const Depositors =
  mongoose.models.depositors || mongoose.model("depositors", depositorSchema);
