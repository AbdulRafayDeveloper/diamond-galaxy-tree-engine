import Joi from "joi";

const objectIdPattern = /^[a-f\d]{24}$/i;

const withdrawerSchema = Joi.object({
  withdrawGateways: Joi.string().min(3).required().messages({
    "string.base": "Withdraw gateway must be a string.",
    "string.empty": "Withdraw gateway is required.",
    "string.min": "Withdraw gateway must be at least 3 characters long.",
  }),

  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number.",
    "number.positive": "Amount must be greater than 0.",
    "any.required": "Amount is required.",
  }),

  address: Joi.string().required().messages({
    "string.base": "Address must be a string.",
    "string.empty": "Address is required.",
  }),

  screenshot: Joi.string().required().messages({
    "string.uri": "Screenshot must be a valid URL.",
    "string.empty": "Screenshot of account is required.",
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

export function validateWithdrawer(data) {
  return withdrawerSchema.validate(data, { abortEarly: false });
}
