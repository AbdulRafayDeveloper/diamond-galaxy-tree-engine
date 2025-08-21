import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import { Users } from "@/app/config/Models/Users/users";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
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
    const amount = parseFloat(body.amount);

    if (isNaN(amount) || amount <= 0) {
      return badRequestResponse("Invalid amount.");
    }

    // Update user's account balance
    const previousBalance = user.accountBalance;
    user.accountBalance += amount;
    await user.save();

    // Create deposit record in Depositors collection (same as normal deposit)
    const newDeposit = new Depositors({
      paymentMethod: "Admin Direct Deposit",
      amount: amount,
      image: "/placeholder.png", // Valid image path for admin deposits
      status: "accepted", // Auto-accepted since admin is adding
      user_id: user._id,
      postBalance: user.accountBalance,
    });

    await newDeposit.save();

    const newTransaction = new Transaction({
      userId: user._id,
      senderId: adminUser._id,
      type: "deposit",
      amount: amount,
      description: "Admin Direct Deposit",
      postbalance: user.accountBalance,
    });

    await newTransaction.save();

    // Send email notification to user
    if (newDeposit) {
      await sendEmail(
        user.email,
        "Deposit Added to Your Account!",
        `
        <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
          <p>Hi ${user.username},</p>
          <p>💰 A deposit of <strong>$${amount.toFixed(2)}</strong> has been added to your account by admin.</p>
          <p>Your updated account balance is now: <strong>$${user.accountBalance.toFixed(2)}</strong>.</p>
          <p>You can view this deposit in your deposit history.</p>
          <br />
          <p>Best regards,<br/>The Team</p>
        </div>
        `
      );
    }

    return successResponse("Deposit added successfully.", {
      updatedBalance: user.accountBalance,
      previousBalance: previousBalance,
      depositAmount: amount,
    });
  } catch (error) {
    console.log("Error in PUT /api/admin-deposit/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}