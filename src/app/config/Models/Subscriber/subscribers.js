import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gift_giverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GiftGiver",
    },
    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Packages",
      required: true,
    },
    totalproperty: {
      type: Number,
      required: true,
    },
    isGifted: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Subscribers =
  mongoose.models.subscribers ||
  mongoose.model("subscribers", subscriberSchema);
