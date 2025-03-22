import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phoneNumber: String,
  country: String,
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

export const Users =
  mongoose.models.users || mongoose.model("users", userSchema);
