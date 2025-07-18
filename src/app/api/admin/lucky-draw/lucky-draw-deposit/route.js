// 'use server';
import connectDB from "@/app/config/db";
import { LuckyDraw } from "@/app/config/Models/Lucky-draw/Lucky-Draw-Info/lucky-draw-info";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import { Commissions } from "@/app/config/Models/Commission/commission";
import { ActivatedSlots } from "@/app/config/Models/Active-Slots/activeSlots";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
} from "@/app/helper/apiResponseHelpers";
import { Transaction } from "@/app/config/Models/Transaction/transaction";

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

    const { amount, userId, balance } = await req.json();

    if (
      !userId ||
      !amount ||
      amount <= 0 ||
      balance == null ||
      balance < amount
    ) {
      return badRequestResponse(
        "Valid userId, amount, and balance are required."
      );
    }

    // Calculate company's remaining balance
    const remainingCompanyBalance = balance - amount;

    // Credit user
    const user = await Users.findById(userId);
    if (!user) return badRequestResponse("User not found");

    user.accountBalance = (user.accountBalance || 0) + amount;
    await user.save();

    // Log commission (with remaining company amount)
    const commission = new Commissions({
      user_id: userId,
      amount: remainingCompanyBalance,
      originalAmount: amount,
      source: "lucky-draw",
    });

    await commission.save();

    await Transaction.create({
      userId: user._id,
      senderId: null,
      type: "luckyDraw",
      amount: amount,
      description: `Amount credited from lucky draw`,
      postbalance: user.accountBalance,
    });

    return successResponse(
      "Deposit added and commission recorded successfully."
    );
  } catch (err) {
    console.log("Error in PUT /api/admin/lucky-draw/deposit/[userId]:", err);
    return serverErrorResponse("Internal server error.");
  }
}
