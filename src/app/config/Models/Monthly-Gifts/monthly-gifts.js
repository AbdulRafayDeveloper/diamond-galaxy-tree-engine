import mongoose from "mongoose";

const monthlyGiftSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    monthly_gift: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const MonthlyGift =
  mongoose.models.monthlygifts ||
  mongoose.model("monthlygifts", monthlyGiftSchema);
