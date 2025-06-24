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
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";

export async function GET(req, context) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const userid = await Users.findById(user._id);

    if (!userid) return notFoundResponse("User not found.");

    return successResponse("User salary retrieved successfully.", {
      userId: userid._id,
      salary: userid.salary ?? null,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/update-salary/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
