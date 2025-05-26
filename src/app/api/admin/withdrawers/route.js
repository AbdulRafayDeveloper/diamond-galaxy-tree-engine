import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/config/db";
import { Withdrawers } from "@/app/config/Models/Withdrawers/withdrawers";
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

    const withdrawals = await Withdrawers.find()
      .populate("user_id", "fname email role")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const filteredWithdrawals = search
      ? withdrawals.filter((w) => {
          const fname = w.user_id?.fname?.toLowerCase() || "";
          const email = w.user_id?.email?.toLowerCase() || "";
          const keyword = search.toLowerCase();
          return fname.includes(keyword) || email.includes(keyword);
        })
      : withdrawals;

    const totalWithdrawals = await Withdrawers.countDocuments();

    return successResponse("Withdrawals fetched successfully.", {
      withdrawals: filteredWithdrawals,
      totalWithdrawals,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.log("Error in GET /api/withdrawers:", error);
    return serverErrorResponse("Internal server error.");
  }
}
