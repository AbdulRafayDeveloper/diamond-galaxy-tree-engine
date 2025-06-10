import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fname: { type: String, required: true },
    lname: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNo: String,
    country: String,
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    referrerId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    referralPath: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
    referenceUrl: { type: String, required: true },
    accountBalance: { type: Number, default: 0 },
    referralChain: {
      type: [mongoose.Schema.Types.ObjectId],
      default: [],
      ref: "Users",
    },
    rewardableReferrals: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    ],
    grade: {
      type: String,
      enum: [
        "Silver Grade",
        "Gold Grade",
        "Diamond Grade",
        "Royal Grade",
        "Star Grade",
      ],
      default: "Silver Grade",
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpCreatedAt: {
      type: Date,
      required: false,
    },
    otpExpiresAt: {
      type: Date,
      required: false,
    },
    is_registered: {
      type: Boolean,
      default: false,
    },
    is_activated: {
      type: Boolean,
      default: false,
    },
    is_gold: {
      type: Boolean,
      default: false,
    },
    is_silver: {
      type: Boolean,
      default: false,
    },
    is_royal: {
      type: Boolean,
      default: false,
    },
    is_star: {
      type: Boolean,
      default: false,
    },
    is_diamond: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Users =
  mongoose.models.users || mongoose.model("users", userSchema);
