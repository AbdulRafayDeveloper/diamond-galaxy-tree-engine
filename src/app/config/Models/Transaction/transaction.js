import { required } from "joi";
import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: "",
    },
    type: {
      type: String,
      enum: [
        "credit",
        "debit",
        "commission",
        "transfer",
        "activation",
        "luckyDraw",
        "monthly_gift",
        "registration",
        "slot purchase",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
    },
    postbalance: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
