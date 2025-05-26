import mongoose from "mongoose";

const registercommission = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    commission: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const RegisterCommissions =
  mongoose.models.registercommission ||
  mongoose.model("registercommission", registercommission);
