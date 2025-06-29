import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/app/config/db";
import { Withdrawers } from "@/app/config/Models/Withdrawers/withdrawers";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateWithdrawer } from "@/app/helper/withdrawer/withdrawer";
import { uploadAndGeneratePublicUrl } from "@/app/helper/Url-Generator/googledrive";

export async function POST(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const formData = await req.formData();

    const existing = await Withdrawers.findOne({
      user_id: user._id,
      status: "pending",
    });

    if (existing) {
      return badRequestResponse(
        "A previous withdraw request is still pending."
      );
    }

    const amountCheck = parseFloat(formData.get("amount"));
    if (amountCheck > user.accountBalance) {
      return badRequestResponse(
        "Withdrawal amount exceeds your account balance."
      );
    }

    const file = formData.get("screenshot");
    if (!file || typeof file !== "object" || !file.name) {
      return badRequestResponse("Screenshot image is required.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;

    const screenshotUrl = await uploadAndGeneratePublicUrl(
      buffer,
      fileName,
      file.type || "image/jpeg"
    );

    const withdrawGateways = formData.get("withdrawGateways");
    const amount = parseFloat(formData.get("amount"));
    const address = formData.get("address");

    const validationData = {
      withdrawGateways,
      amount,
      address,
      screenshot: screenshotUrl,
      user_id: user._id.toString(),
    };

    const { error } = validateWithdrawer(validationData);
    if (error) {
      return badRequestResponse(error.details[0].message);
    }

    const newWithdraw = new Withdrawers(validationData);
    await newWithdraw.save();

    return successResponse(
      "Withdraw request submitted successfully.",
      newWithdraw
    );
  } catch (error) {
    console.log("Error in POST /api/withdrawers:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const withdrawals = await Withdrawers.find({
      user_id: user._id,
    }).sort({ createdAt: -1 });

    const accountBalance = user.accountBalance || 0;

    return successResponse("Withdrawals fetched successfully.", {
      accountBalance,
      withdrawals,
    });
  } catch (error) {
    console.log("Error in GET /api/withdrawers:", error);
    return serverErrorResponse("Internal server error.");
  }
}
