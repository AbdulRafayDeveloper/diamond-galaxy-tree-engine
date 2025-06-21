import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

// ✅ PUT: Update User Salary
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
    const user = await Users.findById(id);
    if (!user) return notFoundResponse("User not found.");

    const body = await req.json();
    const newSalary = Number(body.salary);

    console.log(newSalary);
    if (
      newSalary === undefined ||
      typeof newSalary !== "number" ||
      newSalary < 0
    ) {
      return badRequestResponse("Invalid salary value.");
    }

    user.salary = newSalary;
    await user.save();

    return successResponse("User salary updated successfully.", {
      userId: user._id,
      updatedSalary: user.salary,
    });
  } catch (error) {
    console.error("Error in PUT /api/admin/update-salary/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}

// ✅ GET: Fetch User with Salary
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
    const user = await Users.findById(id);

    if (!user) return notFoundResponse("User not found.");

    return successResponse("User salary retrieved successfully.", {
      userId: user._id,
      salary: user.salary ?? null,
    });
  } catch (error) {
    console.error("Error in GET /api/admin/update-salary/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
