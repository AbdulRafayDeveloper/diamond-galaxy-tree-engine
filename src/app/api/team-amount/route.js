import connectDB from "@/app/config/db";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import mongoose from "mongoose";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const referralIds = user.rewardableReferrals || [];
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);

    const incomeTypes = [
      "activation",
      "registration",
      "slot purchase",
      "luckyDraw",
      "commission",
    ];

    const recentIncome = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id),
          senderId: {
            $in: referralIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
          type: { $in: incomeTypes },
          createdAt: { $gte: last24Hours },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const totalEarnings = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id),
          senderId: {
            $in: referralIds.map((id) => new mongoose.Types.ObjectId(id)),
          },
          type: { $in: incomeTypes },
        },
      },
      {
        $group: {
          _id: null,
          totalIncome: { $sum: "$amount" },
        },
      },
    ]);

    const response = {
      totalTeam: referralIds.length,
      incomeLast24Hours: recentIncome[0]?.totalIncome || 0,
      totalEarning: totalEarnings[0]?.totalIncome || 0,
    };

    return successResponse("Team summary fetched.", response);
  } catch (error) {
    console.error("❌ Error in GET /api/team/summary:", error);
    return serverErrorResponse("Internal server error.");
  }
}
