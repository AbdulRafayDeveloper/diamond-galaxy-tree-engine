import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Education } from "@/app/config/Models/Education/education";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateEducation } from "@/app/helper/Education/educationCheck";

export async function GET(req, context) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const adminUser = await serverSideValidations.validateUserByToken(token);

    if (!adminUser || !adminUser._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (adminUser.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { id } = await context.params;

    const education = await Education.findById(id);
    if (!education) {
      return notFoundResponse("Education entry not found.");
    }

    return successResponse(
      "Education entry retrieved successfully.",
      education
    );
  } catch (error) {
    console.log("Error in GET /api/education/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function PUT(req, context) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const adminUser = await serverSideValidations.validateUserByToken(token);

    if (!adminUser || !adminUser._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (adminUser.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { id } = await context.params;

    const education = await Education.findById(id);
    if (!education) {
      return notFoundResponse("Education entry not found.");
    }

    const body = await req.json();
    const { error, value } = validateEducation(body);

    if (error) {
      return badRequestResponse(error.details[0].message); // one error only
    }

    // Update fields
    education.name = value.name;
    education.url = value.url;
    education.description = value.description;

    await education.save();

    return successResponse("Education entry updated successfully.", education);
  } catch (error) {
    console.log("Error in PUT /api/education/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function DELETE(req, context) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const adminUser = await serverSideValidations.validateUserByToken(token);

    if (!adminUser || !adminUser._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (adminUser.role !== "admin") {
      return conflictResponse("Access denied. Admins only.");
    }

    const { id } = await context.params;

    const education = await Education.findById(id);
    if (!education) {
      return notFoundResponse("Education entry not found.");
    }

    await Education.findByIdAndDelete(id);

    return successResponse("Education entry deleted successfully.");
  } catch (error) {
    console.log("Error in DELETE /api/education/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
