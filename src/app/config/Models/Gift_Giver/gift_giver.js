import mongoose from "mongoose";
import { Users } from "../Users/users";

const giverSchema = new mongoose.Schema(
  {
    giverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Users,
      required: true,
    },
    totalGiven: { type: Number, required: true },
  },
  { timestamps: true }
);

export const GiftGiver =
  mongoose.models.givers || mongoose.model("givers", giverSchema);
