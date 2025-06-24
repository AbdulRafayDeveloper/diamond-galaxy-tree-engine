import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Education } from "@/app/config/Models/Education/education";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateEducation } from "@/app/helper/Education/educationCheck";

export async function POST(req) {
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
    const { error, value } = validateEducation(body);

    if (error) {
      const message = error.details[0].message;
      return badRequestResponse(message);
    }

    const newEducation = await Education.create(value);
    return successResponse("Education entry added successfully.", newEducation);
  } catch (error) {
    console.log("Error in POST /api/education:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function GET(req) {
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
