import mongoose from "mongoose";

const monthlyRewardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    monthly_reward: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const MonthlyReward =
  mongoose.models.monthlyrewards ||
  mongoose.model("monthlyrewards", monthlyRewardSchema);
