import mongoose from "mongoose";

const packagesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["basic", "advance", "premium"],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    property_included: {
      type: Number,
      required: true,
    },
    payment_type: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Packages =
  mongoose.models.packages || mongoose.model("packages", packagesSchema);
