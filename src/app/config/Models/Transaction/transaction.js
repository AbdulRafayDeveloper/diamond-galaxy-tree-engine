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
        "Welcome Bonus",
        "Monthly Pool Gift",
        "Leadership Reward",
        "Slot Commission",
        "Lucky Draw Commission",
        "Social media reward",
        "Target Achiever Reward",
        "Company Bonus",
        "Performance Reward",
        "Referral Bonus",
        "Festival Bonus",
        "Salary",
        "Account Balance",
        "deposit",
        "withdraw",
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
