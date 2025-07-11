import { NextResponse } from "next/server";
import { Users } from "@/app/config/Models/Users/users";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
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

    const foundUser = await Users.findById(user._id).select("referralPath");
    if (!foundUser) {
      return notFoundResponse("User not found.");
    }

    const referralPath =
      foundUser.referralPath instanceof Map
        ? Object.fromEntries(foundUser.referralPath)
        : foundUser.referralPath || {};

    const counts = {};

    for (let i = 1; i <= 7; i++) {
      const key = `level${i}`;
      counts[key] = Array.isArray(referralPath[key])
        ? referralPath[key].length
        : 0;
    }

    return successResponse("Referral levels count fetched", counts);
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
