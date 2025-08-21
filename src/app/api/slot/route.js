import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";

import { Users } from "@/app/config/Models/Users/users";
import { activateCommissions } from "@/app/config/Models/Activate-Commission/activateCommission";
import { ActivatedLevel } from "@/app/config/Models/My-Team/Activated-Levels/activated-levels";
import { Commissions } from "@/app/config/Models/Commission/commission";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import { ActivatedSlots } from "@/app/config/Models/Active-Slots/activeSlots";

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

    if (!freshUser.is_activated) {
      return badRequestResponse("Account must be activated first.");
    }

    const commissionSettings = await activateCommissions.findOne();
    if (!commissionSettings) {
      return badRequestResponse("Commission settings not found.");
    }

    const price = commissionSettings.price;
    const companyPercent = commissionSettings.commission;

    if (freshUser.accountBalance < price) {
      return badRequestResponse(
        `Insufficient balance. Required: ${price}, Available: ${freshUser.accountBalance}`
      );
    }

    // Check current slot status
    let userSlot = await ActivatedSlots.findOne({ userId: freshUser._id });
    const slotIndex = userSlot ? userSlot.active_slot || 0 : 0;

    // Deduct slot purchase fee from user
    freshUser.accountBalance -= price;
    await freshUser.save();

    // Create transaction record for deduction
    await Transaction.create({
      userId: freshUser._id,
      senderId: null,
      type: "slot purchase",
      amount: price,
      description: `Slot Purchase fee deducted`,
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
      source: `slot-activation`,
    });

    // Get level settings
    const levelSettings = await ActivatedLevel.findOne();
    const companyExtraPercent = levelSettings?.companyPercentage || parseFloat(process.env.COMPANY_COMMISSION || "10");
    const companyExtraAmount = (companyExtraPercent / 100) * distributable;

    // Load level percentages dynamically
    const levelPercents = [
      levelSettings?.level1 ?? parseFloat(process.env.ACTIVATE_LEVEL_ONE || "0"),
      levelSettings?.level2 ?? parseFloat(process.env.ACTIVATE_LEVEL_TWO || "0"),
      levelSettings?.level3 ?? parseFloat(process.env.ACTIVATE_LEVEL_THREE || "0"),
      levelSettings?.level4 ?? parseFloat(process.env.ACTIVATE_LEVEL_FOUR || "0"),
      levelSettings?.level5 ?? parseFloat(process.env.ACTIVATE_LEVEL_FIVE || "0"),
      levelSettings?.level6 ?? parseFloat(process.env.ACTIVATE_LEVEL_SIX || "0"),
      levelSettings?.level7 ?? parseFloat(process.env.ACTIVATE_LEVEL_SEVEN || "0"),
    ];

    // Build referral chain properly (closest to furthest)
    let referralChain = [];
    let currentRef = freshUser.referrerId;

    while (currentRef && referralChain.length < 7) {
      const refUser = await Users.findById(currentRef);
      if (refUser) {
        referralChain.push(refUser);
        currentRef = refUser.referrerId;
      } else {
        break;
      }
    }

    console.log("=== SLOT COMMISSION DISTRIBUTION ===");
    console.log("User purchasing slot:", freshUser.username);
    console.log("Slot number:", slotIndex + 1);
    console.log("Total amount:", price);
    console.log("Company commission:", companyAmount);
    console.log("Distributable amount:", distributable);
    console.log("Referral chain length:", referralChain.length);
    console.log("Level percentages:", levelPercents);
    console.log("Company extra amount:", companyExtraAmount);

    let distributedTo = [];
    let totalDistributed = 0;

    // Distribute commissions to each level in order (Level 1 = direct referrer, Level 2 = referrer of Level 1, etc.)
    for (let i = 0; i < referralChain.length && i < 7; i++) {
      const recipient = referralChain[i];
      const levelPercent = levelPercents[i] || 0;
      const amount = (levelPercent / 100) * distributable;

      console.log(`Level ${i + 1} - User: ${recipient.username}, Percent: ${levelPercent}%, Amount: ${amount}, Registered: ${recipient.is_registered}`);

      if (amount > 0) {
        // Check if recipient is registered (optional validation)
        if (recipient.is_activated) {
          recipient.accountBalance += amount;
          await recipient.save();

          await Transaction.create({
            userId: recipient._id,
            senderId: freshUser._id,
            type: "commission",
            amount,
            description: `Level ${i + 1} slot-${slotIndex + 1} activation commission`,
            postbalance: recipient.accountBalance,
          });

          distributedTo.push({
            level: i + 1,
            user: recipient._id,
            amount,
            username: recipient.username,
            percentage: levelPercent
          });
          totalDistributed += amount;

          console.log(`✅ Level ${i + 1}: ${recipient.username} received ${amount} (${levelPercent}%)`);
        } else {
          // If recipient is not registered, add to company
          baseCommission.amount += amount;
          console.log(`❌ Level ${i + 1}: ${recipient.username} not registered, ${amount} goes to company`);
        }
      } else {
        console.log(`⚠️ Level ${i + 1}: ${recipient.username} - No commission (0%)`);
      }
    }

    // Add remaining undistributed amounts to company
    let remainingToCompany = 0;
    for (let i = referralChain.length; i < 7; i++) {
      const missingPercent = levelPercents[i] || 0;
      const amount = (missingPercent / 100) * distributable;
      baseCommission.amount += amount;
      remainingToCompany += amount;
      console.log(`📊 Missing Level ${i + 1}: ${amount} (${missingPercent}%) goes to company`);
    }

    // Add company extra percentage
    baseCommission.amount += companyExtraAmount;

    // Save company commission
    await baseCommission.save();

    // Update slot activation record
    if (!userSlot) {
      userSlot = new ActivatedSlots({
        userId: freshUser._id,
        activated_slots: [1],
        active_slot: 2,
      });
    } else {
      const nextSlot = (userSlot.active_slot || 0) + 1;
      if (!userSlot.activated_slots.includes(nextSlot - 1)) {
        userSlot.activated_slots.push(nextSlot - 1);
      }
      userSlot.active_slot = nextSlot;
    }

    await userSlot.save();

    // Calculate remaining amount that goes to company
    const totalRemainingToCompany = distributable - totalDistributed;

    console.log("=== SLOT DISTRIBUTION SUMMARY ===");
    console.log("Total distributed:", totalDistributed);
    console.log("Remaining to company:", totalRemainingToCompany);
    console.log("Company extra amount:", companyExtraAmount);
    console.log("Total company amount:", baseCommission.amount);
    console.log("Distributed to users:", distributedTo.length);
    console.log("Slot activated:", slotIndex + 1);
    console.log("=====================================");

    return successResponse(`Slot ${slotIndex + 1} activated successfully.`, {
      deductedFrom: freshUser._id,
      total: price,
      companyAmount: companyAmount + companyExtraAmount + totalRemainingToCompany,
      distributedTo,
      summary: {
        totalAmount: price,
        companyCommission: companyAmount,
        distributableAmount: distributable,
        totalDistributed,
        companyExtraAmount,
        remainingToCompany: totalRemainingToCompany,
        levelPercentages: levelPercents,
        referralChainLength: referralChain.length,
        distributedToCount: distributedTo.length,
        slotNumber: slotIndex + 1
      },
      updatedSlot: userSlot,
    });
  } catch (error) {
    console.log("Error in slot commission distribution:", error);
    return serverErrorResponse("Internal server error.");
  }
}
