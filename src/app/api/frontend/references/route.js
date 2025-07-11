import { NextResponse } from "next/server";
import { Users } from "@/app/config/Models/Users/users";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  notFoundResponse,
  serverErrorResponse,
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

    // ✅ Handle both Map and array formats
    let referralIds = [];

    if (Array.isArray(foundUser.referralPath)) {
      // Legacy array format
      referralIds = foundUser.referralPath;
    } else if (
      foundUser.referralPath instanceof Map ||
      typeof foundUser.referralPath === "object"
    ) {
      // New Map or object format with levels (e.g. level1, level2...)
      const pathObject =
        foundUser.referralPath instanceof Map
          ? Object.fromEntries(foundUser.referralPath)
          : foundUser.referralPath;

      referralIds = Object.values(pathObject).flat();
    }

    const referredUsers = await Users.find({
      _id: { $in: referralIds },
    }).select("fname lname username email country createdAt");

    return successResponse(
      "Referred users fetched successfully.",
      referredUsers
    );
  } catch (error) {
    console.error("Referral Path Fetch Error:", error);
    return serverErrorResponse(error.message);
  }
}
