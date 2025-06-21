import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Education } from "@/app/config/Models/Education/education";

import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import { Users } from "@/app/config/Models/Users/users";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (!user.is_activated) {
      return successResponse("Account not activated.", {
        educations: [],
        totalEducations: 0,
        pageNumber: 1,
        pageSize: 0,
        activated: false,
      });
    }

    const {
      pageNumber = "1",
      pageSize = "10",
      search = "",
    } = Object.fromEntries(req.nextUrl.searchParams);

    const page = parseInt(pageNumber, 10);
    const size = parseInt(pageSize, 10);
    const skip = (page - 1) * size;

    const searchFilter = search
      ? {
          $or: [{ name: { $regex: search, $options: "i" } }],
        }
      : {};

    const [educations, totalEducations] = await Promise.all([
      Education.find(searchFilter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(size),
      Education.countDocuments(searchFilter),
    ]);

    return successResponse("Education entries fetched successfully.", {
      educations,
      totalEducations,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.log("Error in GET /api/education:", error);
    return serverErrorResponse("Internal server error.");
  }
}
