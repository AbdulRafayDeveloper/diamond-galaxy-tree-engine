import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/config/db";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
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

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideValidations.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (user.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const {
      pageNumber = "1",
      pageSize = "10",
      search = "",
    } = Object.fromEntries(req.nextUrl.searchParams);

    const page = parseInt(pageNumber, 10);
    const size = parseInt(pageSize, 10);
    const skip = (page - 1) * size;

    const depositors = await Depositors.find()
      .populate("user_id", "fname email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const filteredDepositors = search
      ? depositors.filter((d) =>
          d.user_id?.fname?.toLowerCase().includes(search.toLowerCase())
        )
      : depositors;

    const totalDepositors = await Depositors.countDocuments();

    return successResponse("Depositors fetched successfully.", {
      depositors: filteredDepositors,
      totalDepositors,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.error("Error in GET /api/depositors:", error);
    return serverErrorResponse("Internal server error.");
  }
}
