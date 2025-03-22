import mongoose from "mongoose";
import Properties from "../Property/property";
import Contractor from "../Contractor/contractor";
import { number } from "joi";

const homeInventorySchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Properties",
    required: true,
  },
  contractorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Contractor",
    required: false,
  },
  roomNo: { type: Number, required: true },
  brand: { type: String, required: true },
  dateCompleted: { type: Date, required: true },
  contractorName: { type: String, required: true },
  color: { type: String, required: true },
  additionalNotes: { type: String, trim: true },
  name: { type: String, required: true },
});

export const HomeInventories =
  mongoose.models.homeInventories ||
  mongoose.model("homeInventories", homeInventorySchema);
