import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { MonthlyGift } from "@/app/config/Models/Monthly-Gifts/monthly-gifts";
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
    const monthlyGiftValue = body?.monthly_gift;

    if (monthlyGiftValue === undefined || monthlyGiftValue == "") {
      return badRequestResponse("monthly_gift must be a valid string.");
    }

    await Users.findByIdAndUpdate(user._id, { monthly_gift: monthlyGiftValue });

    let monthlyGiftRecord = await MonthlyGift.findOne({ userId: user._id });

    if (monthlyGiftRecord) {
      monthlyGiftRecord.monthly_gift = monthlyGiftValue;
      await monthlyGiftRecord.save();
    } else {
      const newMonthlyGift = new MonthlyGift({
        userId: user._id,
        monthly_gift: monthlyGiftValue,
      });
      await newMonthlyGift.save();
    }

    return successResponse("Monthly gift updated successfully.");
  } catch (error) {
    console.error("Error in POST /api/monthlygift:", error);
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
      monthly_gift: { $nin: [null, ""] },
      $or: [
        { fname: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    };

    console.log(filter);

    const users = await Users.find(filter)
      .select(
        "fname lname email role accountBalance grade createdAt monthly_gift"
      )
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(size);

    console.log(users);

    const totalUsers = await Users.countDocuments(filter);
    console.log(totalUsers);

    return successResponse("Registered users fetched successfully.", {
      users,
      totalUsers,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    console.log("Error in GET /api/users/registered:", error);
    return serverErrorResponse("Internal server error.");
  }
}
