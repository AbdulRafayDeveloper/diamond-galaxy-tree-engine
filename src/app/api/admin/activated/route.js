import { NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
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

    const filter = {
      is_activated: true,
      $or: [
        { fname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await Users.find(filter)
      .select("fname lname email role accountBalance grade createdAt")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const totalUsers = await Users.countDocuments(filter);

    return successResponse("Registered users fetched successfully.", {
      users,
      totalUsers,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.log("Error in GET /api/users/registered:", error);
    return serverErrorResponse("Internal server error.");
  }
}
