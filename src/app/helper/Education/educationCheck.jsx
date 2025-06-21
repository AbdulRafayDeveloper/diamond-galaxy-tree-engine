import Joi from "joi";

const maxWords = 100;
const wordCountValidator = (value, helpers) => {
  const wordCount = value.trim().split(/\s+/).length;
  if (wordCount > maxWords) {
    return helpers.error("string.maxWords");
  }
  return value;
};

const educationSchema = Joi.object({
  name: Joi.string().max(100).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name cannot be empty.",
    "any.required": "Name is required.",
  }),
  url: Joi.string().uri().required().messages({
    "string.base": "URL must be a string.",
    "string.uri": "Please provide a valid URL.",
    "string.empty": "URL cannot be empty.",
    "any.required": "URL is required.",
  }),
  description: Joi.string()
    .custom(wordCountValidator, "Word count validation")
    .messages({
      "string.base": "Description must be a string.",
      "string.maxWords": `Description must not exceed ${maxWords} words.`,
    }),
});

export function validateEducation(data) {
  return educationSchema.validate(data, { abortEarly: false });
}
