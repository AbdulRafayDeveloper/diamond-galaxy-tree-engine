import Joi from "joi";

const joiApplianceSchema = Joi.object({
  applianceType: Joi.string().trim().required(),
  brand: Joi.string().trim().required(),
  serialNumber: Joi.string().trim().required(),
  image: Joi.string().uri().optional(),
  modelNumber: Joi.string().trim().required(),
  maintenanceStatus: Joi.string()
    .valid("Good", "Upcoming Maintenance", "Urgent Repair")
    .required(),
  propertyId: Joi.string().optional(),

  purchasedFrom: Joi.object({
    companyName: Joi.string().trim().required(),
    contactName: Joi.string().trim().required(),
    phoneNo: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    warrantyExpires: Joi.date().required(),
    purchaseDate: Joi.date().required(),
    companyWebsite: Joi.string().uri().optional(),
  }).required(),

  installedBy: Joi.object({
    companyName: Joi.string().trim().required(),
    contactName: Joi.string().trim().required(),
    phoneNo: Joi.string().trim().required(),
    contractorId: Joi.string().optional(),
    email: Joi.string().email().required(),
    lastService: Joi.date().optional(),
    purchaseDate: Joi.date().required(),
    companyWebsite: Joi.string().uri().optional(),
    installationDate: Joi.date().required(),
  }).required(),

  purchasedBy: Joi.object({
    companyName: Joi.string().trim().required(),
    contactName: Joi.string().trim().required(),
    phoneNo: Joi.string().trim().required(),
    email: Joi.string().email().required(),
    warrantyExpires: Joi.date().required(),
    purchaseDate: Joi.date().required(),
    companyWebsite: Joi.string().uri().optional(),
  }).required(),

  additionalNotes: Joi.string().optional(),
});

export function validateAppliance(data) {
  return joiApplianceSchema.validate(data);
}
