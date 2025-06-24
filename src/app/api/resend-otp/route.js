import { Users } from "@/app/config/Models/Users/users";
import sendEmail from "@/app/helper/sendEmail";
import jwt from "jsonwebtoken";
import db from "@/app/config/db";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
} from "@/app/helper/apiResponseHelpers";
import generateForgetPasswordTemplate from "@/app/helper/generateForgetPasswordTemplate";

export async function POST(req) {
  try {
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return badRequestResponse("Email is required", null);
    }

    console.log("Email:", email);

    const user = await Users.findOne({ email });

    if (!user) {
      return notFoundResponse("User with this email not found", null);
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpCreatedAt = new Date().toISOString();
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await user.save();

    const subject = "Your OTP Code (Resent)";
    const emailContent = generateForgetPasswordTemplate(user.username, otp);

    await sendEmail(email, subject, emailContent);

    const otpToken = jwt.sign(
      { email, otp },
      process.env.FORGET_PASSWORD_TOKEN,
      { expiresIn: "1d" }
    );

    return successResponse("OTP resent successfully!", otpToken);
  } catch (error) {
    console.log("OTP error:", error);
    return serverErrorResponse(
      "Internal server error. Please try again later!"
    );
  }
}
