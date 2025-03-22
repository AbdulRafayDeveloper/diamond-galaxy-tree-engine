import mongoose from "mongoose";

const applianceSchema = new mongoose.Schema(
  {
    applianceType: { type: String, required: true },
    brand: { type: String, required: true },
    serialNumber: { type: String, required: true, unique: true },
    image: { type: String, required: false },
    modelNumber: { type: String, required: true },
    maintenanceStatus: {
      type: String,
      required: true,
      enum: ["Good", "Upcoming Maintenance", "Urgent Repair"],
    },
    propertyId: { type: String, required: true },

    purchasedFrom: {
      companyName: { type: String, required: true },
      contactName: { type: String, required: true },
      phoneNo: { type: String, required: true },
      email: { type: String, required: true },
      warrantyExpires: { type: Date, required: true },
      purchaseDate: { type: Date, required: true },
      companyWebsite: { type: String, required: false },
    },

    installedBy: {
      companyName: { type: String, required: true },
      contactName: { type: String, required: true },
      phoneNo: { type: String, required: true },
      contractorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contractors",
        required: false,
      },
      email: { type: String, required: true },
      lastService: { type: Date, required: false },
      purchaseDate: { type: Date, required: true },
      companyWebsite: { type: String, required: false },
      installationDate: { type: Date, required: true },
    },

    purchasedBy: {
      companyName: { type: String, required: true },
      contactName: { type: String, required: true },
      phoneNo: { type: String, required: true },
      email: { type: String, required: true },
      warrantyExpires: { type: Date, required: true },
      purchaseDate: { type: Date, required: true },
      companyWebsite: { type: String, required: false },
    },

    additionalNotes: { type: String, required: false },
  },
  { timestamps: true }
);

export const Appliances =
  mongoose.models.appliances || mongoose.model("appliances", applianceSchema);
