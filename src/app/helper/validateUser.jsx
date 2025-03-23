import Joi from "joi";

const userSchema = Joi.object({
  firstName: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(2)
    .required()
    .messages({
      "string.pattern.base": "First name must only contain alphabets.",
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters long.",
    }),

  lastName: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(2)
    .required()
    .messages({
      "string.pattern.base": "Last name must only contain alphabets.",
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters long.",
    }),

  username: Joi.string().alphanum().min(3).max(30).required().messages({
    "string.empty": "Username is required.",
    "string.min": "Username must be at least 3 characters long.",
    "string.max": "Username must be at most 30 characters long.",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Please enter a valid email address.",
    "string.empty": "Email is required.",
  }),

  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .required()
    .messages({
      "string.pattern.base": "Phone number must contain 10 to 15 digits only.",
      "string.empty": "Phone number is required.",
    }),

  country: Joi.string().min(2).required().messages({
    "string.empty": "Country is required.",
    "string.min": "Country name is too short.",
  }),

  password: Joi.string().min(8).required().messages({
    "string.min": "Password must be at least 8 characters long.",
    "string.empty": "Password is required.",
  }),

  role: Joi.string().valid("admin", "user").optional().messages({
    "any.only": "Please select a valid role to create an account.",
    "string.empty": "Role is required.",
  }),
});

export function validateUser(data) {
  return userSchema.validate(data, { abortEarly: false });
}
