import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

export async function PUT(req, context) {
  try {
    console.log("PUT /api/admin/register/[id] called with context:", context);
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const adminUser = await serverSideValidations.validateUserByToken(token);

    console.log("Admin user from token:", adminUser);

    if (!adminUser || !adminUser._id) {
      console.log("Unauthorized access attempt with token:", token);
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (adminUser.role !== "admin") {
      console.log("Access denied for non-admin user:", adminUser);
      return conflictResponse("Access denied. Admins only.");
    }

    const { id } = context.params;
    console.log("User ID from context:", id);

    if (!id) {
      return badRequestResponse("User ID is required.");
    }

    console.log("User ID from context:", id);

    const user = await Users.findById(id);

    console.log("User found in database:", user);

    if (!user) {
      return notFoundResponse("User not found.");
    }

    console.log("User found:", user);

    user.is_activated = false;
    await user.save();

    console.log("User activation updated:", user);

    if (user.is_registered) {
      return badRequestResponse("User cannot be deactivated.");
    }

    return successResponse("User deactivated successfully.", user);
  } catch (error) {
    console.log("Error in PUT /api/admin/registered/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
