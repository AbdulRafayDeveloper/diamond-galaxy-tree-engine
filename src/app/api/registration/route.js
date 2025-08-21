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

    if (freshUser.is_registered) {
      return badRequestResponse("User is already registered.");
    }

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

    // Deduct registration fee from user
    freshUser.accountBalance -= price;
    await freshUser.save();

    // Create transaction record for deduction
    await Transaction.create({
      userId: freshUser._id,
      senderId: null,
      type: "registration",
      amount: price,
      description: `Account registration fee deducted`,
      postbalance: freshUser.accountBalance,
    });

    // Calculate company commission first
    const companyAmount = (companyPercent / 100) * price;
    const distributable = price - companyAmount;

    // Create base commission record for company
    const baseCommission = new Commissions({
      user_id: user._id,
      request_id: null,
      amount: companyAmount,
      originalAmount: price,
      rate: companyPercent / 100,
      source: "registration",
    });

    // Get level settings
    const levelSettings = await RegistrationLevel.findOne();
    const level1Percent = levelSettings?.level1 || parseFloat(process.env.REGISTRATION_LEVEL_ONE || "60");
    const level2Percent = levelSettings?.level2 || parseFloat(process.env.REGISTRATION_LEVEL_TWO || "30");
    const companyPercent2 = levelSettings?.companyPercentage || parseFloat(process.env.REGISTRATION_COMPANY_COMMISSION || "10");

    // Calculate commission amounts
    const lvl1Amount = (level1Percent / 100) * distributable;
    const lvl2Amount = (level2Percent / 100) * distributable;
    const companyExtraAmount = (companyPercent2 / 100) * distributable;

    // Build referral chain properly
    let referralChain = [];
    let currentRef = freshUser.referrerId;

    // Get up to 2 levels of referrals
    while (currentRef && referralChain.length < 2) {
      const refUser = await Users.findById(currentRef);
      if (refUser) {
        referralChain.push(refUser);
        currentRef = refUser.referrerId;
      } else {
        break;
      }
    }

    console.log("Referral chain: ", referralChain);
    console.log("Referral chain length: ", referralChain.length);
    console.log("Referral chain: ", referralChain[0]);
    console.log("Referral chain: ", referralChain[1]);
    console.log("lvl1Amount: ", lvl1Amount);
    console.log("lvl2Amount: ", lvl2Amount);
    console.log("companyExtraAmount: ", companyExtraAmount);

    // Distribute commissions based on available levels
    let distributedTo = [];
    let totalDistributed = 0;

    // Level 1 (Direct referrer)
    if (referralChain.length > 0) {
      const level1User = referralChain[0];

      console.log("Level 1 user: ", level1User);
      console.log("Level 1 user is registered: ", level1User.is_registered);

      // Check if Level 1 user is registered (optional validation)
      if (level1User.is_registered) {
        level1User.accountBalance += lvl1Amount;
        await level1User.save();

        await Transaction.create({
          userId: level1User._id,
          senderId: freshUser._id,
          type: "commission",
          amount: lvl1Amount,
          description: "Level 1 registration commission",
          postbalance: level1User.accountBalance,
        });

        distributedTo.push({
          level: 1,
          user: level1User._id,
          amount: lvl1Amount,
          username: level1User.username
        });
        totalDistributed += lvl1Amount;
      } else {
        // If Level 1 user is not registered, add to company
        baseCommission.amount += lvl1Amount;
      }
    } else {
      // No Level 1 user, add to company
      baseCommission.amount += lvl1Amount;
    }

    // Level 2 (Referrer of Level 1)
    if (referralChain.length > 1) {
      const level2User = referralChain[1];

      // Check if Level 2 user is registered (optional validation)
      if (level2User.is_registered) {
        level2User.accountBalance += lvl2Amount;
        await level2User.save();

        await Transaction.create({
          userId: level2User._id,
          senderId: freshUser._id,
          type: "commission",
          amount: lvl2Amount,
          description: "Level 2 registration commission",
          postbalance: level2User.accountBalance,
        });

        distributedTo.push({
          level: 2,
          user: level2User._id,
          amount: lvl2Amount,
          username: level2User.username
        });
        totalDistributed += lvl2Amount;
      } else {
        // If Level 2 user is not registered, add to company
        baseCommission.amount += lvl2Amount;
      }
    } else {
      // No Level 2 user, add to company
      baseCommission.amount += lvl2Amount;
    }

    // Add company extra percentage
    baseCommission.amount += companyExtraAmount;

    // Save company commission
    await baseCommission.save();

    // Mark user as registered
    freshUser.is_registered = true;
    await freshUser.save();

    // Calculate remaining amount that goes to company
    const remainingToCompany = distributable - totalDistributed;

    return successResponse("Registration completed and commission distributed successfully.", {
      deductedFrom: freshUser._id,
      total: price,
      companyAmount: companyAmount + companyExtraAmount + remainingToCompany,
      distributedTo,
      summary: {
        totalAmount: price,
        companyCommission: companyAmount,
        distributableAmount: distributable,
        level1Amount: lvl1Amount,
        level2Amount: lvl2Amount,
        companyExtraAmount,
        totalDistributed,
        remainingToCompany
      }
    });
  } catch (error) {
    console.log("Error in registration commission distribution:", error);
    return serverErrorResponse("Internal server error.");
  }
}
