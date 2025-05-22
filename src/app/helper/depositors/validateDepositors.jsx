import Joi from "joi";

const objectIdPattern = /^[a-f\d]{24}$/i;

const depositorSchema = Joi.object({
  paymentMethod: Joi.string().min(3).required().messages({
    "string.base": "Payment method must be a string.",
    "string.empty": "Payment method is required.",
    "string.min": "Payment method must be at least 3 characters long.",
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number.",
    "number.positive": "Amount must be greater than 0.",
    "any.required": "Amount is required.",
  }),

  image: Joi.string().required().messages({
    "string.empty": "Deposit slip image is required.",
  }),

  status: Joi.string()
    .valid("pending", "approved", "rejected")
    .default("pending")
    .messages({
      "any.only": "Status must be one of [pending, approved, rejected].",
    }),

  user_id: Joi.string().pattern(objectIdPattern).required().messages({
    "string.pattern.base": "User ID must be a valid 24-character ObjectId.",
    "string.empty": "User ID is required.",
  }),
});

export function validateDepositor(data) {
  return depositorSchema.validate(data, { abortEarly: false });
}
