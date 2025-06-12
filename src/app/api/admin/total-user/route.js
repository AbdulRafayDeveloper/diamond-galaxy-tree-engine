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

export async function GET(req) {
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
    const users = await Users.find({ role: { $ne: "admin" } });

    if (!users || users.length === 0) {
      return successResponse("No eligible users found for lucky draw.");
    }

    const randomUser = users[Math.floor(Math.random() * users.length)];

    const slotRecord = await ActivatedSlots.findOne({ userId: randomUser._id });
    const isInActivatedSlots = !!slotRecord;

    return successResponse("Random user selected successfully", {
      winner: {
        id: randomUser._id,
        name: `${randomUser.fname} ${randomUser.lname}`,
        email: randomUser.email,
        username: randomUser.username,
        totalSpent: 0,
        isInActivatedSlots,
        is_registered: randomUser.is_registered,
      },
      totalCompanyCommission: "0.00",
      participantsCount: users.length,
    });
  } catch (error) {
    console.log("Error in GET /api/admin/lucky-draw/random:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function PUT(req) {
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

    const { amount, userId } = await req.json();
    console.log(amount);
    console.log(userId);

    if (!userId || !amount || amount <= 0) {
      return badRequestResponse("Valid userId and amount are required.");
    }

    const user = await Users.findById(userId);
    if (!user) return badRequestResponse("User not found.");

    user.accountBalance = (user.accountBalance || 0) + amount;
    await user.save();

    return successResponse("Amount successfully added to user.");
  } catch (err) {
    console.error("Error in PUT /api/admin/lucky-draw/deposit/[userId]:", err);
    return serverErrorResponse("Internal server error.");
  }
}
