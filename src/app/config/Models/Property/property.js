import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    color: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    purchaseDate: {
      type: Date,
      required: true,
    },
    propertyPrice: {
      type: Number,
      required: true,
    },
    yearBuilt: {
      type: Number,
      required: true,
    },
    interestRate: {
      type: Number,
      required: true,
    },
    squareFeet: {
      type: Number,
      required: true,
    },
    image: { type: String, default: null },
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscribers",
      required: true,
    },
  },
  { timestamps: true }
);

export const Properties =
  mongoose.models.properties || mongoose.model("properties", propertySchema);
