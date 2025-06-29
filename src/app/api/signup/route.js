import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "@/app/config/Models/Users/users";
import { validateUser } from "@/app/helper/validateUser";

import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import connectDB from "@/app/config/db";
import generateEmailVerificationTemplate from "@/app/helper/generateEmailVerificationTemplate";
import sendEmail from "@/app/helper/sendEmail";

const JWT_SECRET = process.env.JWT_SECRET;
const url = process.env.REFERENCE_URL;

export async function POST(req) {
  try {
    await connectDB();
    let {
      fname,
      lname,
      username,
      email,
      phoneNo,
      country,
      password,
      referrerCode,
    } = await req.json();

    console.log(
      fname,
      lname,
      username,
      email,
      phoneNo,
      country,
      password,
      referrerCode
    );

    console.log("Referrer code: ", referrerCode);

    const { error } = validateUser({
      fname,
      lname,
      username,
      email,
      phoneNo,
      country,
      password,
      referrerCode,
    });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.details[0].message },
        { status: 400 }
      );
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: "Email already exists" },
        { status: 409 }
      );
    }

    const existingUsername = await Users.findOne({ username });
    if (existingUsername) {
      return NextResponse.json(
        { success: false, error: "Username already taken" },
        { status: 409 }
      );
    }

    let referrerId = null;
    let referralChain = [];

    if (referrerCode) {
      const referrerUser = await Users.findOne({ username: referrerCode });

      if (!referrerUser) {
        return NextResponse.json(
          { success: false, error: "Invalid referral code" },
          { status: 400 }
        );
      }

      referrerId = referrerUser._id;
      const parentChain = referrerUser.referralChain || [];
      referralChain = [referrerId, ...parentChain];
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const referenceUrl = `${url}${username}`;
    console.log(referenceUrl);

    country = countries.getAlpha2Code(country, "en");

    if (!country) {
      return NextResponse.json(
        { success: false, error: "Invalid country name" },
        { status: 400 }
      );
    }

    const newUser = new Users({
      fname,
      lname,
      username,
      email,
      phoneNo,
      country,
      password: hashedPassword,
      role: "user",
      referrerId: referrerId ?? null,
      referralPath: [],
      referenceUrl,
      referralChain,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return NextResponse.json(
        { success: false, error: "Failed to save the user" },
        { status: 500 }
      );
    }

    if (referrerId) {
      await Users.findByIdAndUpdate(referrerId, {
        $addToSet: { referralPath: savedUser._id },
      });
    }

    for (let i = 0; i < referralChain.length && i < 7; i++) {
      await Users.findByIdAndUpdate(referralChain[i], {
        $addToSet: { rewardableReferrals: savedUser._id },
      });
    }

    const token = jwt.sign(
      { id: savedUser._id, name: savedUser.username, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Failed to generate token" },
        { status: 500 }
      );
    }

    const subject = "Verify Your Email";
    const emailContent = generateEmailVerificationTemplate(savedUser.username, `${process.env.CLIENT_URL}/auth/verify-email?token=${token}`);

    await sendEmail(email, subject, emailContent);

    return NextResponse.json(
      {
        success: true,
        message: "Account created successfully! Please check your Gmail inbox and click the verification link to activate your account.",
        token,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Signup Error:", error);
    return NextResponse.json(
      { success: false, error: "Signup failed. Please try again later." },
      { status: 500 }
    );
  }
}
