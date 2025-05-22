import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

export async function PUT(req, { params }) {
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

    const { id } = params;
    const body = await req.json();
    const { status } = body;

    if (!["accepted", "rejected"].includes(status)) {
      return badRequestResponse(
        "Invalid status. Must be 'accepted' or 'rejected'."
      );
    }

    const deposit = await Depositors.findById(id);
    if (!deposit) {
      return notFoundResponse("Deposit request not found.");
    }

    if (deposit.status !== "pending") {
      return conflictResponse("Deposit already processed.");
    }

    const user = await Users.findById(deposit.user_id);
    if (!user) {
      return notFoundResponse("User associated with deposit not found.");
    }

    if (status === "accepted") {
      user.accountBalance += deposit.amount;
      await user.save();
    }

    deposit.status = status;
    await deposit.save();

    return successResponse(`Deposit ${status} successfully.`, {
      status: deposit.status,
      amount: deposit.amount,
      user: {
        id: user._id,
        accountBalance: user.accountBalance,
      },
    });
  } catch (error) {
    console.log("Error in PUT /api/depositors/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
