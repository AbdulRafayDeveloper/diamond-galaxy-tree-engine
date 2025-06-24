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

    const body = await req.json();
    const newGrade = body.grade;

    if (!newGrade || typeof newGrade !== "string") {
      return badRequestResponse("Invalid grade provided.");
    }

    user.grade = newGrade;
    await user.save();

    return successResponse("User grade updated successfully.", {
      updatedGrade: user.grade,
    });
  } catch (error) {
    console.log("Error in PUT /api/admin/update-grade/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
