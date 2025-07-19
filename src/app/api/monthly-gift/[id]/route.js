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
import sendEmail from "@/app/helper/sendEmail";

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
    if (!user) {
      return notFoundResponse("User not found.");
    }

    const body = await req.json();

    console.log("body data : ", body);

    const amount = parseFloat(body.amount);
    const description = body.message;

    if (isNaN(amount) || amount <= 0) {
      return badRequestResponse("Invalid amount.");
    }

    user.accountBalance += amount;
    await user.save();

    console.log("User description: ", description);

    const newTransaction = new Transaction({
      userId: user._id,
      senderId: adminUser._id,
      type: description || "Monthly Gift",
      amount: amount,
      description: `${description} given to you by the company`,
      postbalance: user.accountBalance,
    });

    await newTransaction.save();
    if (newTransaction) {
      await sendEmail(
        user.email,
        "You've Received a Monthly Gift!",
        `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p>Hi ${user.username},</p>
          <p>🎁 You have received a monthly gift of <strong>$${amount.toFixed(
          2
        )}</strong>.</p>
          <p><strong>Description:</strong> ${description}</p>
          <p>Your updated account balance is now: <strong>$${user.accountBalance.toFixed(
          2
        )}</strong>.</p>
          <p>Keep up the great work!</p>
          <br />
          <p>Best regards,<br/>The Team</p>
        </div>
        `
      );
    }

    return successResponse("Monthly gift applied successfully.", {
      updatedBalance: user.accountBalance,
    });
  } catch (error) {
    console.log("Error in PUT /api/admin/monthly-gift/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
