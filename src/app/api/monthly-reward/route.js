import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { MonthlyReward } from "@/app/config/Models/Monthly-Reward/monthly-reward";
import { Users } from "@/app/config/Models/Users/users";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function POST(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const body = await req.json();
    const monthlyRewardValue = body?.monthly_reward;

    if (monthlyRewardValue === undefined || monthlyRewardValue == "") {
      return badRequestResponse("monthly_reward must be a valid string.");
    }

    await Users.findByIdAndUpdate(user._id, {
      monthly_reward: monthlyRewardValue,
    });

    let monthlyRewardRecord = await MonthlyReward.findOne({ userId: user._id });

    if (monthlyRewardRecord) {
      monthlyRewardRecord.monthly_reward = monthlyRewardValue;
      await monthlyRewardRecord.save();
    } else {
      const newMonthlyReward = new MonthlyReward({
        userId: user._id,
        monthly_reward: monthlyRewardValue,
      });
      await newMonthlyReward.save();
    }

    return successResponse("Monthly reward updated successfully.");
  } catch (error) {
    console.error("Error in POST /api/monthly-reward:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideValidations.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    if (user.role !== "admin") {
      return badRequestResponse("Access denied. Admins only.");
    }

    const {
      pageNumber = "1",
      pageSize = "10",
      search = "",
    } = Object.fromEntries(req.nextUrl.searchParams);

    const page = parseInt(pageNumber, 10);
    const size = parseInt(pageSize, 10);
    const skip = (page - 1) * size;

    const filter = {
      monthly_reward: { $nin: [null, ""] },
      $or: [
        { fname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    const users = await Users.find(filter)
      .select(
        "fname lname email role accountBalance grade createdAt monthly_reward"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    const totalUsers = await Users.countDocuments(filter);

    return successResponse("Registered users fetched successfully.", {
      users,
      totalUsers,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.log("Error in GET /api/monthly-reward:", error);
    return serverErrorResponse("Internal server error.");
  }
}
