import { number } from "joi";
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
    referralPath: {
      type: Map,
      of: [{ type: mongoose.Schema.Types.ObjectId, ref: "users" }],
      default: {},
    },

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
        "Member",
        "N/A",
      ],
      default: "N/A",
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
    monthly_gift: {
      type: String,
      default: null,
    },
    monthly_reward: {
      type: String,
      default: null,
    },
    salary: {
      type: Number,
      default: null,
    },
    image: {
      type: String,
      default: null,
    },
    isEmailVerified: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Users =
  mongoose.models.users || mongoose.model("users", userSchema);
