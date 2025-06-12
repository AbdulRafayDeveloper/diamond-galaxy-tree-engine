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
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const adminUser = await serverSideValidations.validateUserByToken(token);

    if (!adminUser || !adminUser._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (adminUser.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { id } = context.params;

    const user = await Users.findById(id);

    if (!user) {
      return notFoundResponse("User not found.");
    }

    user.is_registered = false;
    await user.save();

    return successResponse("User unregistered successfully.", user);
  } catch (error) {
    console.log("Error in PUT /api/admin/registered/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
