import mongoose from "mongoose";

const registrationLevelSchema = new mongoose.Schema(
  {
    level1: {
      type: Number,
      required: true,
      default: 0,
    },
    level2: {
      type: Number,
      required: true,
      default: 0,
    },
    companyPercentage: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);

export const RegistrationLevel =
  mongoose.models.registrationlevel ||
  mongoose.model("registrationlevel", registrationLevelSchema);
