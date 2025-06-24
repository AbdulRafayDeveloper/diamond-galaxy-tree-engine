import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

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

    const { id } = context.params;

    const user = await Users.findById(id);
    if (!user) {
      return notFoundResponse("User not found.");
    }

    const body = await req.json();
    const amount = parseFloat(body.amount);
    const message = body.message || "";

    if (isNaN(amount) || amount <= 0) {
      return badRequestResponse("Invalid amount.");
    }

    user.accountBalance += amount;
    await user.save();

    const newTransaction = new Transaction({
      userId: user._id,
      senderId: adminUser._id,
      type: "monthly_gift",
      amount: amount,
      description: message || `Company gifted this amount (monthly_gift)`,
      postbalance: user.accountBalance,
    });

    await newTransaction.save();

    return successResponse("Monthly gift applied successfully.", {
      updatedBalance: user.accountBalance,
    });
  } catch (error) {
    console.log("Error in PUT /api/admin/monthly-gift/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
