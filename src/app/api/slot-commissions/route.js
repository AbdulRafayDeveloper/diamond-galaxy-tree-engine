import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";

import { activateCommissions } from "@/app/config/Models/Slots/slots";
import serverSideValidations from "@/app/helper/serverSideValidations";
import { Users } from "@/app/config/Models/Users/users";
import { ActivatedSlots } from "@/app/config/Models/Active-Slots/activeSlots";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    console.log(token);
    const user = await serverSideUserValidation.validateUserByToken(token);
    console.log("User data: ", user);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const config = await activateCommissions.findOne();

    const userSlots = await ActivatedSlots.findOne({ userId: user._id });

    return successResponse("Slot commissions retrieved successfully.", {
      commissions: config || null,
      userSlots: userSlots || null,
    });
  } catch (error) {
    console.error("Error in GET /api/activatecommissions:", error);
    return serverErrorResponse("Internal server error.");
  }
}
