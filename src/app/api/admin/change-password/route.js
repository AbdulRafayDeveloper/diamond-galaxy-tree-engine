import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import bcrypt from "bcrypt";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function PUT(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideValidations.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (user.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return badRequestResponse("Both current and new passwords are required.");
    }

    const existingUser = await Users.findById(user._id);
    if (!existingUser) {
      return badRequestResponse("User not found.");
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      existingUser.password
    );
    if (!isMatch) {
      return badRequestResponse("Current password is incorrect.");
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    existingUser.password = hashedNewPassword;
    await existingUser.save();

    return successResponse("Password changed successfully.");
  } catch (error) {
    console.error("Error in PUT /api/user/change-password:", error);
    return serverErrorResponse("Failed to change password. Try again later.");
  }
}
