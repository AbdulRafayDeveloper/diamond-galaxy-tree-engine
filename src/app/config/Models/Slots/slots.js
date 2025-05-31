import mongoose from "mongoose";

const slotSchema = new mongoose.Schema({
  slotNumber: {
    type: Number,
    required: true,
  },
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
});

const activateCommissionSchema = new mongoose.Schema(
  {
    slots: {
      type: [slotSchema],
      validate: [(arr) => arr.length === 12, "Exactly 12 slots are required."],
    },
  },
  { timestamps: true }
);

export const activateCommissions =
  mongoose.models.activateSlotcommission ||
  mongoose.model("activateSlotcommission", activateCommissionSchema);
