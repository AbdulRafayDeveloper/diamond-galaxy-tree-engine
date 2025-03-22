import mongoose from "mongoose";
import { Subscribers } from "../Subscriber/subscribers";

const contractorSchema = new mongoose.Schema(
  {
    contractorType: {
      type: String,
      required: true,
      enum: [
        "Insurance agent",
        "Mortgage company",
        "Real estate agent",
        "Electrician",
        "Handyman",
        "House cleaner",
        "HVAC company",
        "Pest control",
        "Plumber",
        "Pool maintenance",
        "Power washer",
        "Window washer",
        "Yard maintenance",
        "Cable company",
        "Electric company",
        "Gas company",
        "Internet company",
        "Recycling service",
        "Trash service",
      ],
    },
    companyName: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNo: {
      type: String,
      required: true,
      trim: true,
    },
    companyWebsite: {
      type: String,
      trim: true,
    },
    contractorEmail: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    additionalNotes: {
      type: String,
      trim: true,
    },
    subscriberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Subscribers,
      required: true,
    },
  },
  { timestamps: true }
);

export const Contractor =
  mongoose.models.contractors ||
  mongoose.model("contractors", contractorSchema);
