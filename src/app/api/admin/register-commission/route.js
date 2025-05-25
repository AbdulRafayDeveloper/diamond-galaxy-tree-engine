import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { RegisterCommissions } from "@/app/config/Models/Register-Commission/registerCommission";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const config = await RegisterCommissions.findOne();

    return successResponse(
      "Register commission retrieved successfully.",
      config
    );
  } catch (error) {
    console.log("Error in GET /api/registercommission:", error);
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
    const { price, commission } = body;

    if (typeof price !== "number" || typeof commission !== "number") {
      return badRequestResponse("Both price and commission must be numbers.");
    }

    const updated = await RegisterCommissions.findOneAndUpdate(
      {},
      { price, commission },
      { upsert: true, new: true }
    );

    return successResponse(
      "Register commission updated successfully.",
      updated
    );
  } catch (error) {
    console.log("Error in PUT /api/registercommission:", error);
    return serverErrorResponse("Internal server error.");
  }
}
