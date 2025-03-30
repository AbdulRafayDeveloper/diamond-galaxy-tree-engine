import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "@/app/config/Models/Users/users";
import { validateUser } from "@/app/helper/validateUser";

import countries from "i18n-iso-countries";
countries.registerLocale(require("i18n-iso-countries/langs/en.json"));
import connectDB from "@/app/config/db";

const JWT_SECRET = process.env.JWT_SECRET;
const url = process.env.REFERENCE_URL;

export async function POST(req) {
  try {
    await connectDB();
    let {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      password,
      referrerCode,
    } = await req.json();

    console.log("Referrer code: ", referrerCode);

    const { error } = validateUser({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
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
    let referrerPathBase = [];
    let referrerUser;

    if (referrerCode) {
      referrerUser = await Users.findOne({ username: referrerCode });

      if (!referrerUser) {
        return NextResponse.json(
          { success: false, error: "Invalid referral code" },
          { status: 400 }
        );
      }

      referrerId = referrerUser._id;
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
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      password: hashedPassword,
      role: "user",
      referrerId: referrerId ?? null,
      referralPath: [],
      referenceUrl,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return NextResponse.json(
        { success: false, error: "Failed to save the user" },
        { status: 500 }
      );
    }

    if (referrerUser) {
      await Users.findByIdAndUpdate(referrerUser._id, {
        $addToSet: { referralPath: savedUser._id },
      });
    }

    const token = jwt.sign(
      { id: savedUser._id, name: savedUser.username, role: savedUser.role },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    return NextResponse.json(
      {
        success: true,
        message: "User registered successfully",
        token,
        savedUser,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Signup Error:", error);
    return NextResponse.json(
      { success: false, error: "Signup failed. Please try again later." },
      { status: 500 }
    );
  }
}
