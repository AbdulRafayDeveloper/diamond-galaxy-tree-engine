import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: String,
    country: String,
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    referralPath: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    referenceUrl: { type: String, required: true },
    referralChain: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Users",
    },
    rewardableReferrals: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    ],
  },
  {
    timestamps: true,
  }
);

export const Users =
  mongoose.models.users || mongoose.model("users", userSchema);
