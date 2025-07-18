// /api/user/grade/route.js

import db from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await db();

    console.log("GET /api/user-grades");

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    console.log("User ID:", user._id);
    const foundUser = await Users.findById(user._id).select("grade");

    if (!foundUser) {
      return badRequestResponse("User not found.");
    }

    console.log("User Grade:", foundUser.grade);

    return successResponse("User grade fetched successfully.", {
      grade: foundUser.grade,
    });
  } catch (error) {
    console.error("Error in GET /api/user/grade:", error);
    return serverErrorResponse("Internal server error.");
  }
}
