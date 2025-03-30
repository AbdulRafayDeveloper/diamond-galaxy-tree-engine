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

import { Subscribers } from "@/app/config/Models/Subscriber/subscribers";
import serverSideValidations from "@/app/helper/serverSideValidations";
import connectDB from "@/app/config/db";
export async function GET(req, res) {
  try {
    await connectDB();
    const token = serverSideValidations.checkTokenValidationStyle(req);
    console.log(token);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (user.status) return user;

    const foundUser = await Users.findById(user._id).populate("referrerId");

    if (!foundUser) {
      return notFoundResponse("User not found.", null);
    }

    console.log(foundUser);

    return successResponse("User retrieved successfully.", foundUser);
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
