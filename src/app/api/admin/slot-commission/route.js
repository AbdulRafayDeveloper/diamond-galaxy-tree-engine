import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideValidations from "@/app/helper/serverSideValidations";
import { activateCommissions } from "@/app/config/Models/Slots/slots";
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
    const user = await serverSideValidations.validateUserByToken(token);
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
export async function PUT(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const admin = await serverSideValidations.validateUserByToken(token);

    if (!admin || !admin._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (admin.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const body = await req.json();
    const { slots } = body;

    if (!Array.isArray(slots) || slots.length !== 12) {
      return badRequestResponse("Exactly 12 slots must be provided.");
    }

    for (const slot of slots) {
      if (
        typeof slot.slotNumber !== "number" ||
        typeof slot.price !== "number" ||
        typeof slot.commission !== "number"
      ) {
        return badRequestResponse(
          "Each slot must include numeric slotNumber, price, and commission."
        );
      }
    }

    const updated = await activateCommissions.findOneAndUpdate(
      {},
      { slots },
      { upsert: true, new: true }
    );

    return successResponse("Slot commissions updated successfully.", updated);
  } catch (error) {
    console.log("Error in PUT /api/activatecommissions:", error);
    return serverErrorResponse("Internal server error.");
  }
}
