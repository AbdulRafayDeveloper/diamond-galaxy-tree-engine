import { NextResponse } from "next/server";
import { Users } from "@/app/config/Models/Users/users";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  conflictResponse,
  serverErrorResponse,
  unauthorizedResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

import serverSideValidations from "@/app/helper/serverSideValidations";
import connectDB from "@/app/config/db";

export async function GET(req, res) {
  try {
    await connectDB();
    const token = serverSideValidations.checkTokenValidationStyle(req);
    console.log(token);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (user.status) return user;

    const foundUser = await Users.findById(user._id).select("referralPath");

    if (!foundUser) {
      return notFoundResponse("User not found.", null);
    }

    const referredUsers = await Users.find({
      _id: { $in: foundUser.referralPath },
    }).select("fname lname username email country createdAt");

    return successResponse(
      "Referred users fetched successfully.",
      referredUsers
    );
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
