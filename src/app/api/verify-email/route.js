import jwt from "jsonwebtoken";
import { Users } from "@/app/config/Models/Users/users";
import db from "@/app/config/db";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

export async function POST(req) {
  try {
    await db();
    const authHeader = req.headers.get("authorization");
    console.log("authHeader:", authHeader);

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return notFoundResponse("Authentication token is required", null);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return notFoundResponse("Authentication token is required", null);
    }

    console.log("Token:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;

    if (!id) {
      return notFoundResponse("Invalid token. User ID not found", null);
    }

    console.log("Decoded User ID:", id);

    const user = await Users.findById(id);

    if (!user) {
      return notFoundResponse("User not found", null);
    }

    console.log("User found:", user);

    if (user.isEmailVerified) {
      return successResponse("Email already verified", null);
    }

    user.isEmailVerified = true;
    const updatedUser = await user.save();

    console.log("Updated User:", updatedUser);

    if (!updatedUser) {
      return serverErrorResponse("Failed to verify email status of user account.", null);
    }

    return successResponse("Email verified successfully", null);
  } catch (err) {
    console.error("JWT Error:", err);
    return serverErrorResponse("Internal server error. Please try again later!", err.message);
  }
}
