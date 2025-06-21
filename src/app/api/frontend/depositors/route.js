import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";
import connectDB from "@/app/config/db";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateDepositor } from "@/app/helper/depositors/validateDepositors";
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

    const existing = await Depositors.findOne({
      user_id: user._id,
      status: "pending",
    });

    if (existing) {
      return badRequestResponse("A previous deposit request is still pending.");
    }

    const file = formData.get("image");
    if (!file || typeof file !== "object" || !file.name) {
      return badRequestResponse("Image file is required.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const ext = file.name.split(".").pop();
    const fileName = `${uuidv4()}.${ext}`;

    // 🔁 Upload to Google Drive and get URL
    const imageUrl = await uploadAndGeneratePublicUrl(
      buffer,
      fileName,
      file.type || "image/jpeg"
    );

    const paymentMethod = formData.get("paymentMethod");
    const amount = parseFloat(formData.get("amount"));

    const validationData = {
      paymentMethod,
      amount,
      image: imageUrl,
      user_id: user._id.toString(),
    };

    const { error } = validateDepositor(validationData);
    if (error) {
      return badRequestResponse(
        "Validation error",
        error.details.map((e) => e.message)
      );
    }

    const newDepositor = new Depositors(validationData);
    await newDepositor.save();

    return successResponse(
      "Depositor entry created successfully.",
      newDepositor
    );
  } catch (error) {
    console.error("Error in POST /api/depositors:", error);
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
    const deposits = await Depositors.find({
      user_id: user._id,
      status: { $ne: "pending" },
    }).sort({ createdAt: -1 });

    const accountBalance = user.accountBalance || 0;

    return successResponse("Deposits fetched successfully.", {
      accountBalance,
      deposits,
    });
  } catch (error) {
    console.log("Error in GET /api/depositors:", error);
    return serverErrorResponse("Internal server error.");
  }
}
