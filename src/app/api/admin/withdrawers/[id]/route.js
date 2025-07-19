import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Withdrawers } from "@/app/config/Models/Withdrawers/withdrawers";
import { Users } from "@/app/config/Models/Users/users";
import { Commissions } from "@/app/config/Models/Commission/commission";
import serverSideValidations from "@/app/helper/serverSideValidations";
import sendEmail from "@/app/helper/sendEmail";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
const commission = process.env.WITHDRAW_COMPANY_COMMISSION;
import { Transaction } from "@/app/config/Models/Transaction/transaction";

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
      const commissionRate = parseFloat(commission) / 100;
      const commissionAmount = parseFloat(
        (withdrawal.amount * commissionRate).toFixed(2)
      );
      const actualDeduction = parseFloat(
        (withdrawal.amount + commissionAmount).toFixed(2)
      );

      if (user.accountBalance < actualDeduction) {
        return badRequestResponse("Insufficient balance in user's account.");
      }

      const currentBalance = user.accountBalance;

      user.accountBalance -= actualDeduction;
      await Users.findByIdAndUpdate(user._id, {
        accountBalance: user.accountBalance,
      });

      await Transaction.create({
        userId: user._id,
        senderId: null,
        type: "withdraw",
        amount: actualDeduction,
        description: `Amount withdrawn`,
        postbalance: user.accountBalance,
      });

      withdrawal.postBalance = user.accountBalance;

      await Commissions.create({
        user_id: user._id,
        request_id: withdrawal._id,
        amount: commissionAmount,
        originalAmount: withdrawal.amount,
        rate: commissionRate,
        source: "withdraw",
      });
    } else {
      withdrawal.postBalance = user.accountBalance;
    }

    withdrawal.status = status;
    await withdrawal.save();

    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <p>Hi ${user.fname || user.email},</p>
        <p>Your withdrawal request of <strong>$${
          withdrawal.amount
        }</strong> has been <strong>${formattedStatus}</strong>.</p>
        <p>Your balance after this request was <strong>$${
          withdrawal.postBalance
        }</strong>.</p>
        ${
          status === "accepted"
            ? `<p><strong>${parseFloat(
                commission
              )}%</strong> commission was deducted. <strong>$${(
                withdrawal.amount -
                (withdrawal.amount * parseFloat(commission)) / 100
              ).toFixed(2)}</strong> has been credited to your account.</p>`
            : ""
        }
        <p>Thank you,<br/>Diamond Galaxy Team</p>
      </div>
    `;

    await sendEmail(
      user.email,
      `Withdrawal Request ${formattedStatus}`,
      emailHTML
    );

    return successResponse(`Withdrawal ${status} successfully.`, {
      status: withdrawal.status,
      amount: withdrawal.amount,
      user: {
        id: user._id,
        accountBalance: user.accountBalance,
      },
    });
  } catch (error) {
    console.log("Error in PUT /api/withdrawers/[id]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
