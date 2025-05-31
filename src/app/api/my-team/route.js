import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { ActivatedLevel } from "@/app/config/Models/My-Team/Activated-Levels/activated-levels";
import { SlotLevel } from "@/app/config/Models/My-Team/Slot-Levels/slot-levels";
import { RegistrationLevel } from "@/app/config/Models/My-Team/Registration-Levels/registration-levels";

import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
} from "@/app/helper/apiResponseHelpers";

import {
  validateActivatedLevels,
  validateSlotLevels,
  validateRegistrationLevels,
} from "@/app/helper/My-Team/myTeamsValidation";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideValidations.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (user.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const activated = await ActivatedLevel.findOne().lean();
    const slot = await SlotLevel.findOne().lean();
    const registration = await RegistrationLevel.findOne().lean();

    return successResponse("Level configs fetched successfully.", {
      activated,
      slot,
      registration,
    });
  } catch (err) {
    console.error("GET /api/admin/level-configs error:", err);
    return serverErrorResponse("Internal server error.");
  }
}

export async function PUT(req) {
  try {
    console.log("entered in api");
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideValidations.validateUserByToken(token);

    console.log(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (user.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    if (!["activated", "slot", "registration"].includes(type)) {
      return badRequestResponse("Invalid or missing type parameter.");
    }

    const body = await req.json();
    let validationResult;
    let Model;

    switch (type) {
      case "activated":
        validationResult = validateActivatedLevels(body);
        Model = ActivatedLevel;
        break;
      case "slot":
        validationResult = validateSlotLevels(body);
        Model = SlotLevel;
        break;
      case "registration":
        validationResult = validateRegistrationLevels(body);
        Model = RegistrationLevel;
        break;
    }

    if (validationResult.error) {
      const messages = validationResult.error.details.map((e) => e.message);
      return badRequestResponse("Validation failed.", { errors: messages });
    }

    const existing = await Model.findOne();
    if (existing) {
      await Model.updateOne({ _id: existing._id }, body);
    } else {
      await Model.create(body);
    }

    return successResponse(`${type} levels updated successfully.`);
  } catch (err) {
    console.error("PUT /api/admin/level-configs error:", err);
    return serverErrorResponse("Internal server error.");
  }
}
