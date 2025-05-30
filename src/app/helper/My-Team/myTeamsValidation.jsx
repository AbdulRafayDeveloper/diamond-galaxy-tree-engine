import Joi from "joi";

const percentField = (label) =>
  Joi.number()
    .min(0)
    .max(100)
    .required()
    .messages({
      "number.base": `${label} must be a number.`,
      "number.min": `${label} cannot be less than 0%.`,
      "number.max": `${label} cannot be more than 100%.`,
      "any.required": `${label} is required.`,
    });

const validateTotal = (fields, label) => (obj, helpers) => {
  const sum = fields.reduce((acc, key) => acc + (obj[key] || 0), 0);
  if (sum !== 100) {
    return helpers.message(
      `Total percentage for ${label} must equal 100%. Current total: ${sum}%.`
    );
  }
  return obj;
};

const activatedFields = [
  "level1",
  "level2",
  "level3",
  "level4",
  "level5",
  "level6",
  "level7",
  "companyPercentage",
];

const activatedSchema = Joi.object({
  level1: percentField("Level 1"),
  level2: percentField("Level 2"),
  level3: percentField("Level 3"),
  level4: percentField("Level 4"),
  level5: percentField("Level 5"),
  level6: percentField("Level 6"),
  level7: percentField("Level 7"),
  companyPercentage: percentField("Company Percentage"),
}).custom(validateTotal(activatedFields, "Activated Levels"));

const slotFields = [...activatedFields];
const slotSchema = Joi.object({
  level1: percentField("Level 1"),
  level2: percentField("Level 2"),
  level3: percentField("Level 3"),
  level4: percentField("Level 4"),
  level5: percentField("Level 5"),
  level6: percentField("Level 6"),
  level7: percentField("Level 7"),
  companyPercentage: percentField("Company Percentage"),
}).custom(validateTotal(slotFields, "Slot Levels"));

// --- Registration Levels Schema (2 levels + company)
const registrationFields = ["level1", "level2", "companyPercentage"];
const registrationSchema = Joi.object({
  level1: percentField("Level 1"),
  level2: percentField("Level 2"),
  companyPercentage: percentField("Company Percentage"),
}).custom(validateTotal(registrationFields, "Registration Levels"));

export function validateActivatedLevels(data) {
  return activatedSchema.validate(data, { abortEarly: false });
}

export function validateSlotLevels(data) {
  return slotSchema.validate(data, { abortEarly: false });
}

export function validateRegistrationLevels(data) {
  return registrationSchema.validate(data, { abortEarly: false });
}
