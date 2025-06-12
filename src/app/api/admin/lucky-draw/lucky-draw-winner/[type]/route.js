import connectDB from "@/app/config/db";
import { LuckyDraw } from "@/app/config/Models/Lucky-draw/Lucky-Draw-Info/lucky-draw-info";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import { Commissions } from "@/app/config/Models/Commission/commission";

import { ActivatedSlots } from "@/app/config/Models/Active-Slots/activeSlots";

export async function GET(req, context) {
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

    const params = await context.params;
    const { type } = params;

    if (!type) return badRequestResponse("Lucky draw type is required.");

    const draw = await LuckyDraw.findOne({ type }).populate(
      "participants.user_id"
    );

    if (!draw || draw.participants.length === 0) {
      return successResponse("No participants found for this lucky draw.");
    }

    const randomIndex = Math.floor(Math.random() * draw.participants.length);
    const winner = draw.participants[randomIndex];
    const winnerUser = winner.user_id;

    const totalCompanyCommission = draw.participants.reduce(
      (sum, p) => sum + (p.companyCommission || 0),
      0
    );

    const slotRecord = await ActivatedSlots.findOne({ userId: winnerUser._id });
    const isInActivatedSlots = !!slotRecord;

    return successResponse("Lucky draw result generated successfully", {
      winner: {
        id: winnerUser._id,
        name: `${winnerUser.fname} ${winnerUser.lname}`,
        email: winnerUser.email,
        username: winnerUser.username,
        totalSpent: winner.total,
        isInActivatedSlots: isInActivatedSlots,
        is_registered: winnerUser.is_registered,
      },
      totalCompanyCommission: totalCompanyCommission.toFixed(2),
      participantsCount: draw.participants.length,
    });
  } catch (error) {
    console.log("Error in GET /api/admin/lucky-draw/winner/[type]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
