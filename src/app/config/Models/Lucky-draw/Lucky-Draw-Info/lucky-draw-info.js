import mongoose from "mongoose";

const luckyDrawSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    drawDate: {
      type: Date,
      required: true,
    },
    levelOnePercentage: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      enum: ["gold", "silver", "royal", "star", "diamond"],
      required: true,
    },
    participants: [
      {
        user_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "users",
          default: null,
        },
        levelOne: {
          type: Number,
          default: null,
        },
        companyCommission: {
          type: Number,
          default: null,
        },
        total: {
          type: Number,
          default: null,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const LuckyDraw =
  mongoose.models.luckydraws || mongoose.model("luckydraws", luckyDrawSchema);
