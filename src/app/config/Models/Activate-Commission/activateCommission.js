import mongoose from "mongoose";

const activatecommission = new mongoose.Schema(
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

export const activateCommissions =
  mongoose.models.activatecommission ||
  mongoose.model("activatecommission", activatecommission);
