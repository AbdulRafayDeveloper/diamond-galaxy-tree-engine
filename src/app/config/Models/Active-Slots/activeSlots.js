import mongoose from "mongoose";

const activatedSlotsSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
    activated_slots: {
      type: [Number],
      default: [],
    },
    active_slot: {
      type: Number,
      default: null,
    },
  },
  { timestamps: true }
);

export const ActivatedSlots =
  mongoose.models.activatedslots ||
  mongoose.model("activatedslots", activatedSlotsSchema);
