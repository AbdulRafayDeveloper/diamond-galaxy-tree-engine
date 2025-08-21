import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import { RegisterCommissions } from "@/app/config/Models/Register-Commission/registerCommission";
import { RegistrationLevel } from "@/app/config/Models/My-Team/Registration-Levels/registration-levels";
import { activateCommissions } from "@/app/config/Models/Activate-Commission/activateCommission";
import { ActivatedLevel } from "@/app/config/Models/My-Team/Activated-Levels/activated-levels";
import { buildReferralChain, calculateCommissionAmounts } from "@/app/helper/commissionHelper";

import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');
    const type = searchParams.get('type') || 'registration'; // registration, activation, slot

    if (!userId) {
      return badRequestResponse("User ID is required");
    }

    const user = await Users.findById(userId);
    if (!user) {
      return badRequestResponse("User not found");
    }

    let commissionSettings, levelSettings, price, companyPercent;
    let levelPercentages = [];

    if (type === 'registration') {
      // Get registration commission settings
      commissionSettings = await RegisterCommissions.findOne();
      levelSettings = await RegistrationLevel.findOne();

      if (!commissionSettings || !levelSettings) {
        return badRequestResponse("Registration commission settings not found");
      }

      price = commissionSettings.price;
      companyPercent = commissionSettings.commission;
      levelPercentages = [
        levelSettings.level1 || 60,
        levelSettings.level2 || 30
      ];
    } else if (type === 'activation' || type === 'slot') {
      // Get activation commission settings
      commissionSettings = await activateCommissions.findOne();
      levelSettings = await ActivatedLevel.findOne();

      if (!commissionSettings || !levelSettings) {
        return badRequestResponse("Activation commission settings not found");
      }

      price = commissionSettings.price;
      companyPercent = commissionSettings.commission;
      levelPercentages = [
        levelSettings.level1 ?? parseFloat(process.env.ACTIVATE_LEVEL_ONE || "0"),
        levelSettings.level2 ?? parseFloat(process.env.ACTIVATE_LEVEL_TWO || "0"),
        levelSettings.level3 ?? parseFloat(process.env.ACTIVATE_LEVEL_THREE || "0"),
        levelSettings.level4 ?? parseFloat(process.env.ACTIVATE_LEVEL_FOUR || "0"),
        levelSettings.level5 ?? parseFloat(process.env.ACTIVATE_LEVEL_FIVE || "0"),
        levelSettings.level6 ?? parseFloat(process.env.ACTIVATE_LEVEL_SIX || "0"),
        levelSettings.level7 ?? parseFloat(process.env.ACTIVATE_LEVEL_SEVEN || "0"),
      ];
    }

    // Build referral chain
    const maxLevels = type === 'registration' ? 2 : 7;
    const referralChain = await buildReferralChain(user.referrerId, maxLevels);

    // Calculate amounts
    const amounts = calculateCommissionAmounts(price, companyPercent, levelPercentages);

    // Calculate company extra amount
    const companyExtraPercent = levelSettings?.companyPercentage || parseFloat(process.env.COMPANY_COMMISSION || "10");
    const companyExtraAmount = (companyExtraPercent / 100) * amounts.distributable;

    // Simulate distribution
    const distribution = {
      user: {
        id: user._id,
        username: user.username,
        referrerId: user.referrerId
      },
      type: type,
      settings: {
        price,
        companyPercent,
        companyExtraPercent,
        levelPercentages
      },
      calculations: amounts,
      referralChain: referralChain.map((ref, index) => ({
        level: index + 1,
        id: ref._id,
        username: ref.username,
        is_registered: ref.is_registered,
        wouldReceive: amounts.levelAmounts[index] || 0,
        percentage: levelPercentages[index] || 0
      })),
      summary: {
        totalAmount: price,
        companyAmount: amounts.companyAmount,
        distributable: amounts.distributable,
        companyExtraAmount,
        totalToCompany: amounts.companyAmount + companyExtraAmount
      }
    };

    // Calculate what would go to company if levels don't exist
    let remainingToCompany = amounts.distributable;
    let totalDistributed = 0;
    let distributedTo = [];

    referralChain.forEach((ref, index) => {
      if (ref.is_registered && amounts.levelAmounts[index] > 0) {
        remainingToCompany -= amounts.levelAmounts[index];
        totalDistributed += amounts.levelAmounts[index];
        distributedTo.push({
          level: index + 1,
          username: ref.username,
          amount: amounts.levelAmounts[index],
          percentage: levelPercentages[index]
        });
      }
    });

    distribution.summary.remainingToCompany = remainingToCompany;
    distribution.summary.totalToCompany += remainingToCompany;
    distribution.summary.totalDistributed = totalDistributed;
    distribution.summary.distributedTo = distributedTo;
    distribution.summary.referralChainLength = referralChain.length;

    return successResponse(`${type} commission distribution test completed`, distribution);
  } catch (error) {
    console.log("Error in commission test:", error);
    return serverErrorResponse("Internal server error.");
  }
} 