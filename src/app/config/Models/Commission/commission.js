import mongoose from "mongoose";

const commissionSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    request_id: {
      type: mongoose.Schema.Types.ObjectId,
    },
    amount: {
      type: Number,
      required: true,
    },
    originalAmount: {
      type: Number,
      required: true,
    },
    rate: {
      type: Number,
      default: 0.01,
    },
    source: {
      type: String,
      enum: ["deposit", "withdraw", "registration", "activation"],
    },
  },
  { timestamps: true }
);

export const Commissions =
  mongoose.models.commissions ||
  mongoose.model("commissions", commissionSchema);
