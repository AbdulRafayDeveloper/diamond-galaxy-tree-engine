import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import { activateCommissions } from "@/app/config/Models/Slots/slots";
import { Users } from "@/app/config/Models/Users/users";
import { SlotLevel } from "@/app/config/Models/My-Team/Slot-Levels/slot-levels";
import { ActivatedSlots } from "@/app/config/Models/Active-Slots/activeSlots";
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
    const commissionSettings = await activateCommissions.findOne();
    const levelSettings = await SlotLevel.findOne();

    if (!commissionSettings || !commissionSettings.slots?.length) {
      return badRequestResponse("Slot commission settings not configured.");
    }

    // Check slot activation state
    let userSlot = await ActivatedSlots.findOne({ userId: freshUser._id });
    let slotIndex = 0;

    if (userSlot) {
      slotIndex = (userSlot.active_slot ?? 1) - 1;
    }

    if (slotIndex >= commissionSettings.slots.length) {
      return badRequestResponse("All slots already activated.");
    }

    const currentSlot = commissionSettings.slots[slotIndex];
    const price = currentSlot.price ?? 0;
    const companyPercent = currentSlot.commission ?? 0;

    if (freshUser.accountBalance < price) {
      return badRequestResponse(
        `Insufficient balance. Required: ${price}, Available: ${freshUser.accountBalance}`
      );
    }

    // Deduct from user
    freshUser.accountBalance -= price;
    await freshUser.save();

    await Transaction.create({
      userId: freshUser._id,
      senderId: null,
      type: "slot purchase",
      amount: price,
      description: `Slot Purchase fee deducted`,
      postbalance: freshUser.accountBalance,
    });

    const companyAmount = (companyPercent / 100) * price;
    const distributable = price - companyAmount;

    const baseCommission = new Commissions({
      user_id: user._id,
      request_id: null,
      amount: companyAmount,
      originalAmount: price,
      rate: companyPercent / 100,
      source: `slot-activation`,
    });

    const companyExtraPercent =
      levelSettings?.companyPercentage ||
      parseFloat(process.env.COMPANY_COMMISSION || "10");
    const companyExtraAmount = (companyExtraPercent / 100) * distributable;

    // Prepare uplines
    let uplines = [];
    let currentRef = freshUser.referrerId;
    while (currentRef && uplines.length < 7) {
      const refUser = await Users.findById(currentRef);
      if (!refUser) break;
      uplines.push(refUser);
      currentRef = refUser.referrerId;
    }

    const levelPercents = [
      levelSettings?.level1 ??
        parseFloat(process.env.ACTIVATE_LEVEL_ONE || "0"),
      levelSettings?.level2 ??
        parseFloat(process.env.ACTIVATE_LEVEL_TWO || "0"),
      levelSettings?.level3 ??
        parseFloat(process.env.ACTIVATE_LEVEL_THREE || "0"),
      levelSettings?.level4 ??
        parseFloat(process.env.ACTIVATE_LEVEL_FOUR || "0"),
      levelSettings?.level5 ??
        parseFloat(process.env.ACTIVATE_LEVEL_FIVE || "0"),
      levelSettings?.level6 ??
        parseFloat(process.env.ACTIVATE_LEVEL_SIX || "0"),
      levelSettings?.level7 ??
        parseFloat(process.env.ACTIVATE_LEVEL_SEVEN || "0"),
    ];

    let levelTracker = 0;
    let distributedTo = [];

    const reversedUplines = [...uplines].reverse();
    for (let i = 0; i < reversedUplines.length; i++) {
      const recipient = reversedUplines[i];
      const levelPercent = levelPercents[levelTracker++] || 0;
      const amount = (levelPercent / 100) * distributable;

      recipient.accountBalance += amount;
      await recipient.save();

      await Transaction.create({
        userId: recipient._id,
        senderId: freshUser._id,
        type: "commission",
        amount,
        description: `Level ${i + 1} slot-${
          slotIndex + 1
        } activation commission`,
        postbalance: recipient.accountBalance,
      });

      distributedTo.push({
        level: i + 1,
        user: recipient._id,
        amount,
      });
    }

    // Distribute unearned commissions to company
    for (; levelTracker < 7; levelTracker++) {
      const missingPercent = levelPercents[levelTracker] || 0;
      const amount = (missingPercent / 100) * distributable;
      baseCommission.amount += amount;
    }

    baseCommission.amount += companyExtraAmount;
    await baseCommission.save();

    // Save slot activation record
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

    return successResponse(`Slot ${slotIndex + 1} activated successfully.`, {
      deductedFrom: freshUser._id,
      total: price,
      distributedTo,
      company: {
        companyAmount,
        companyExtraAmount,
        retainedFromMissingLevels:
          baseCommission.amount - companyAmount - companyExtraAmount,
      },
      updatedSlot: userSlot,
    });
  } catch (error) {
    console.log("Error in GET /api/distribute-activation-commission:", error);
    return serverErrorResponse("Internal server error.");
  }
}
