import { Users } from "@/app/config/Models/Users/users";
import sendEmail from "@/app/helper/senEmail";
import jwt from "jsonwebtoken";
import db from "@/app/config/db";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
} from "@/app/helper/apiResponseHelpers";
import serverSideValidations from "@/app/helper/serverSideValidations";

export async function POST(req = null, res = null) {
  try {
    const body = await req.json();
    const decodedToken = serverSideValidations.verifyOtpToken(req);
    console.log("decodedToken:", decodedToken);
    const { email, otp } = decodedToken;
    const { userOtp } = body;

    console.log("userOtp:", userOtp);

    if (!userOtp) {
      return badRequestResponse("OTP is required", null);
    }

    if (userOtp !== otp) {
      return badRequestResponse("Invalid OTP", null);
    }

    const user = await Users.findOne({ email, otp });

    console.log("user after verification:", user);

    if (!user) {
      return notFoundResponse("No user found with this email or OTP is invalid", null);
    }

    const otpAge = Date.now() - new Date(user.otpCreatedAt).getTime();

    // const otpValidityDuration = 60 * 1000;
    const otpValidityDuration = 5 * 60 * 1000; // 5 minutes in milliseconds

    console.log("otpAge:", otpAge);
    console.log("otpValidityDuration:", otpValidityDuration);
    console.log("otpCreatedAt:", user.otpCreatedAt);
    console.log("otpExpiresAt:", user.otpExpiresAt);
    console.log("otp:", user.otp);

    if (otpAge > otpValidityDuration) {
      await Users.findOneAndUpdate({ email }, { otp: null, otpCreatedAt: null });
      return badRequestResponse("OTP has expired", null);
    }

    const resetPasswordToken = jwt.sign(
      { email },
      process.env.RESET_PASSWORD_TOKEN,
      { expiresIn: "1d" }
    );

    console.log("resetPasswordToken:", resetPasswordToken);

    user.otp = null;
    user.otpCreatedAt = null;
    const updatedUser = await user.save();

    if (!updatedUser) {
      return serverErrorResponse("Unable to update user. Please try again later");
    }

    console.log("user after resetPasswordToken:", user);

    return successResponse("OTP has been verified successfully", resetPasswordToken);
  } catch (error) {
    console.log(error);
    return serverErrorResponse("Internal server error. Please try again later!", error.message);
  }
}
