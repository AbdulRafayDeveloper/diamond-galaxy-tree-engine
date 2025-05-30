import mongoose from "mongoose";

const activatedLevelSchema = new mongoose.Schema(
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
    level3: {
      type: Number,
      required: true,
      default: 0,
    },
    level4: {
      type: Number,
      required: true,
      default: 0,
    },
    level5: {
      type: Number,
      required: true,
      default: 0,
    },
    level6: {
      type: Number,
      required: true,
      default: 0,
    },
    level7: {
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

export const ActivatedLevel =
  mongoose.models.activatedlevel ||
  mongoose.model("activatedlevel", activatedLevelSchema);
