import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Withdrawers } from "@/app/config/Models/Withdrawers/withdrawers";
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

    const withdrawal = await Withdrawers.findById(id);
    if (!withdrawal) {
      return notFoundResponse("Withdrawal request not found.");
    }

    if (withdrawal.status !== "pending") {
      return conflictResponse("Withdrawal already processed.");
    }

    const user = await Users.findById(withdrawal.user_id);
    if (!user) {
      return notFoundResponse("User associated with withdrawal not found.");
    }

    if (status === "accepted") {
      if (user.accountBalance < withdrawal.amount) {
        return badRequestResponse("Insufficient balance in user's account.");
      }

      user.accountBalance -= withdrawal.amount;
      await Users.findByIdAndUpdate(user._id, {
        accountBalance: user.accountBalance,
      });
    }

    const updatedWithdrawal = await Withdrawers.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    return successResponse(`Withdrawal ${status} successfully.`, {
      status: updatedWithdrawal.status,
      amount: updatedWithdrawal.amount,
      user: {
        id: user._id,
        accountBalance: user.accountBalance,
      },
    });
  } catch (error) {
    console.error("Error in PUT /api/withdrawers/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
