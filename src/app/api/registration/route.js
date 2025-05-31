import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";

import { Users } from "@/app/config/Models/Users/users";
import { RegisterCommissions } from "@/app/config/Models/Register-Commission/registerCommission";
import { RegistrationLevel } from "@/app/config/Models/My-Team/Registration-Levels/registration-levels";
import { Commissions } from "@/app/config/Models/Commission/commission";
import { Transaction } from "@/app/config/Models/Transaction/transaction";

import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);
    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const freshUser = await Users.findById(user._id);
    const registerCommission = await RegisterCommissions.findOne();
    if (!registerCommission) {
      return badRequestResponse("Commission settings not found.");
    }

    const price = registerCommission.price;
    const companyPercent = registerCommission.commission;

    if (freshUser.accountBalance < price) {
      return badRequestResponse(
        `Insufficient balance. Required: ${price}, Available: ${freshUser.accountBalance}`
      );
    }

    freshUser.accountBalance -= price;
    await freshUser.save();

    const companyAmount = (companyPercent / 100) * price;
    const distributable = price - companyAmount;

    const baseCommission = new Commissions({
      user_id: user._id,
      request_id: null,
      amount: companyAmount,
      originalAmount: price,
      rate: companyPercent / 100,
      source: "registration",
    });

    const levelSettings = await RegistrationLevel.findOne();
    const level1Percent =
      levelSettings?.level1 || parseFloat(process.env.LEVEL_ONE || "60");
    const level2Percent =
      levelSettings?.level2 || parseFloat(process.env.LEVEL_TWO || "30");
    const companyPercent2 =
      levelSettings?.companyPercentage ||
      parseFloat(process.env.COMPANY_COMMISSION || "10");

    const lvl1Amount = (level1Percent / 100) * distributable;
    const lvl2Amount = (level2Percent / 100) * distributable;
    const companyExtraAmount = (companyPercent2 / 100) * distributable;

    let ref2 = null;
    let ref1 = null;

    if (freshUser.referrerId) {
      ref2 = await Users.findById(freshUser.referrerId);
    }

    if (ref2?.referrerId) {
      ref1 = await Users.findById(ref2.referrerId);
    }

    if (ref1) {
      ref1.accountBalance += lvl1Amount;
      await ref1.save();
      await Transaction.create({
        userId: ref1._id,
        senderId: freshUser._id,
        type: "commission",
        amount: lvl1Amount,
        description: "Level 1 registration commission",
      });

      ref2.accountBalance += lvl2Amount;
      await ref2.save();
      await Transaction.create({
        userId: ref2._id,
        senderId: freshUser._id,
        type: "commission",
        amount: lvl2Amount,
        description: "Level 2 registration commission",
      });
    } else if (ref2) {
      ref2.accountBalance += lvl1Amount;
      await ref2.save();
      await Transaction.create({
        userId: ref2._id,
        senderId: freshUser._id,
        type: "commission",
        amount: lvl1Amount,
        description: "Level 1 registration commission",
      });

      baseCommission.amount += lvl2Amount;
    } else {
      baseCommission.amount += lvl1Amount + lvl2Amount;
    }

    baseCommission.amount += companyExtraAmount;

    await baseCommission.save();

    return successResponse("Commission distributed successfully.", {
      deductedFrom: freshUser._id,
      total: price,
      distributed: {
        companyAmount,
        companyExtraAmount,
        level1: ref1?._id || null,
        level2: ref2?._id || null,
      },
    });
  } catch (error) {
    console.log("Error in GET /api/distribute-registration-commission:", error);
    return serverErrorResponse("Internal server error.");
  }
}
