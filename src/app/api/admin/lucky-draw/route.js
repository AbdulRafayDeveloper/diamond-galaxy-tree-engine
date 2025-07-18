import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { LuckyDraw } from "@/app/config/Models/Lucky-draw/Lucky-Draw-Info/lucky-draw-info";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import { Users } from "@/app/config/Models/Users/users";

export async function GET(req, context) {
  try {
    await connectDB();
    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const draw = await LuckyDraw.find();

    if (!draw) {
      return successResponse("Lucky draw not found.");
    }

    const userDrawStatus = {};
    const drawFields = [
      "is_gold",
      "is_silver",
      "is_diamond",
      "is_star",
      "is_royal",
    ];

    drawFields.forEach((field) => {
      if (user[field]) {
        userDrawStatus[field] = true;
      }
    });

    return successResponse("Lucky draw fetched successfully.", {
      draws: draw,
      activeDraws: userDrawStatus,
    });
  } catch (error) {
    console.log("Error in GET /api/admin/lucky-draw:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function PUT(req) {
  try {
    await connectDB();
    console.log("entered 1");
    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);
    console.log("entered 3");

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const body = await req.json();
    const { type } = body;

    console.log("Type: ", type);

    const draw = await LuckyDraw.findOne({ type });
    if (!draw) return badRequestResponse("Lucky draw type not found");

    console.log("Draw: ", draw);

    const userDoc = await Users.findById(user._id);

    console.log("User Document: ", userDoc);

    const userDrawField = `is_${type}`;
    if (userDoc[userDrawField]) {
      return successResponse(
        `You have already purchased the ${type} lucky draw`
      );
    }

    console.log("User Draw Field: ", userDrawField);

    if (userDoc.accountBalance < draw.price) {
      return badRequestResponse("Insufficient balance for lucky draw purchase");
    }

    console.log("User Account Balance: ", userDoc.accountBalance);

    const user1 = await Users.findByIdAndUpdate(
      user._id,
      { $inc: { accountBalance: -draw.price } },
      { new: true }
    );

    console.log("Updated User Document: ", user1);

    await Transaction.create({
      userId: user1._id,
      senderId: null,
      type: "luckyDraw",
      amount: draw.price,
      description: `Lucky Draw fee deducted`,
      postbalance: user1.accountBalance,
    });

    const firstLevelUser = userDoc.referrerId
      ? await Users.findById(userDoc.referrerId)
      : null;

    console.log("First Level User: ", firstLevelUser);

    let levelOneCommission = 0;
    let companyCommission = draw.price;

    console.log("Initial Company Commission: ", companyCommission);

    if (firstLevelUser) {
      levelOneCommission = (draw.price * draw.levelOnePercentage) / 100;
      companyCommission = draw.price - levelOneCommission;

      firstLevelUser.accountBalance += levelOneCommission;
      await firstLevelUser.save();

      await Transaction.create({
        userId: firstLevelUser._id,
        senderId: user._id,
        type: "commission",
        amount: levelOneCommission,
        description: `Level 1 commission for Lucky Draw: ${type}`,
        postbalance: firstLevelUser.accountBalance,
      });
    }

    draw.participants.push({
      user_id: user._id,
      levelOne: firstLevelUser ? levelOneCommission : null,
      companyCommission: companyCommission,
      total: draw.price,
    });

    await draw.save();

    await Users.findByIdAndUpdate(user._id, { [userDrawField]: true });

    return successResponse("Lucky draw purchased successfully");
  } catch (err) {
    console.log("Error in PUT /api/lucky-draw/purchase:", err);
    return serverErrorResponse("Internal server error.");
  }
}
