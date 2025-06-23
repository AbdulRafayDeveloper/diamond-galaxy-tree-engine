import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
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
const commission = process.env.DEPOSIT_COMPANY_COMMISSION;
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
      const commissionPercent = parseFloat(commission); // From env, e.g., 10
      const commissionRate = commissionPercent / 100; // 0.10
      const commissionAmount = parseFloat(
        (deposit.amount * commissionRate).toFixed(2)
      );
      const creditedAmount = parseFloat(
        (deposit.amount - commissionAmount).toFixed(2)
      );

      // Save commission entry
      await Commissions.create({
        user_id: user._id,
        request_id: deposit._id,
        amount: commissionAmount,
        originalAmount: deposit.amount,
        rate: commissionRate,
        source: "deposit",
      });

      user.accountBalance += creditedAmount;
      await user.save();

      await Transaction.create({
        userId: user._id,
        senderId: null,
        type: "credit",
        amount: creditedAmount,
        description: `Amount credited`,
        postbalance: user.accountBalance,
      });

      deposit.postBalance = user.accountBalance;
    } else {
      deposit.postBalance = user.accountBalance;
    }

    deposit.status = status;
    await deposit.save();

    const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1);
    const emailHTML = `
      <div style="font-family: Arial, sans-serif; font-size: 16px; color: #333;">
        <p>Hi ${user.fname || user.email},</p>
        <p>Your deposit request of <strong>$${
          deposit.amount
        }</strong> has been <strong>${formattedStatus}</strong>.</p>
        <p>Your balance after this deposit was <strong>$${
          deposit.postBalance
        }</strong>.</p>
        ${
          status === "accepted"
            ? `<p><strong>${parseFloat(
                commission
              )}%</strong> commission was deducted. <strong>$${(
                deposit.amount -
                (deposit.amount * parseFloat(commission)) / 100
              ).toFixed(2)}</strong> has been credited to your account.</p>`
            : ""
        }
        <p>Thank you,<br/>Diamond Galaxy Team</p>
      </div>
    `;

    await sendEmail(
      user.email,
      `Deposit Request ${formattedStatus}`,
      emailHTML
    );

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
