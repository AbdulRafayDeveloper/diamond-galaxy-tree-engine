import mongoose from "mongoose";

const slotLevelSchema = new mongoose.Schema(
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

export const SlotLevel =
  mongoose.models.slotlevel || mongoose.model("slotlevel", slotLevelSchema);
