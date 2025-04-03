import Joi from "joi";

const objectIdPattern = /^[a-f\d]{24}$/i;

const userSchema = Joi.object({
  fname: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(2)
    .required()
    .messages({
      "string.pattern.base": "First name must only contain alphabets.",
      "string.empty": "First name is required.",
      "string.min": "First name must be at least 2 characters long.",
    }),

  lname: Joi.string()
    .pattern(/^[A-Za-z\s'-]+$/)
    .min(2)
    .required()
    .messages({
      "string.pattern.base": "Last name must only contain alphabets.",
      "string.empty": "Last name is required.",
      "string.min": "Last name must be at least 2 characters long.",
    }),

  username: Joi.string()
    .pattern(/^[^\s]{3,30}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Username can be (3 to 30) words long except spaces",
      "string.empty": "Username is required.",
    }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": "Please enter a valid email address.",
      "string.empty": "Email is required.",
    }),

  phoneNo: Joi.string()
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

  password: Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/)
    .required()
    .messages({
      "string.pattern.base":
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.",
      "string.empty": "Password is required.",
    }),

  role: Joi.string().valid("admin", "user").optional().messages({
    "any.only": "Please select a valid role to create an account.",
    "string.empty": "Role is required.",
  }),
  referrerCode: Joi.string().empty("").optional(),
});

export function validateUser(data) {
  return userSchema.validate(data, { abortEarly: false });
}
