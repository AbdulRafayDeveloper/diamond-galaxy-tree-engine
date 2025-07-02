import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import { Users } from "@/app/config/Models/Users/users";

import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);
    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const freshUser = await Users.findById(user._id);

    // check that if he already activated his account
    if (freshUser.is_activated) {
      return badRequestResponse("Account is already activated.");
    }

    return successResponse("Account is not activated", null);
  } catch (error) {
    console.log("Error in GET /api/activation/check-account-activate:", error);
    return serverErrorResponse("Internal server error.");
  }
}
