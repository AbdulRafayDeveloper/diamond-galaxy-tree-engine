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
    await db();
    const body = await req.json();
    const { email } = body;

    if (!email) {
      return badRequestResponse("Email is required", { set_Email: false });
    }

    console.log("Email:", email);

    const user = await Users.findOne({ email });

    if (!user) {
      return notFoundResponse("User with this email not found", {
        set_Email: false,
      });
    }

    console.log("User found:", user);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpCreatedAt = new Date().toISOString();
    user.otpExpiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await user.save();

    console.log("User found:", user);
    console.log("OTP:", otp);
    console.log("OTP Created At:", user.otpCreatedAt);
    console.log("OTP Expires At:", user.otpExpiresAt);
    console.log("Email:", email);
    console.log("User ID:", user._id);

    const subject = "Reset Your Password";
    const emailContent = generateForgetPasswordTemplate(user.username, otp);

    await sendEmail(email, subject, emailContent);

    console.log("Email sent to:", email);
    console.log("Email content:", emailContent);

    const otpToken = jwt.sign(
      { email, otp },
      process.env.FORGET_PASSWORD_TOKEN,
      { expiresIn: "1d" }
    );

    console.log("OTP Token:", otpToken);
    console.log("OTP Token Created At:", new Date().toISOString());

    return successResponse("OTP has been successfully sent to your email", {
      otpToken,
      set_Email: true,
    });
  } catch (error) {
    console.log("OTP error:", error);
    return serverErrorResponse(
      "Internal server error. Please try again later!"
    );
  }
}
