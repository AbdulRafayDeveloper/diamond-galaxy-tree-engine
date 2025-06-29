import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSignIn } from "@/app/helper/userSignIn";
import { Users } from "@/app/config/Models/Users/users";

import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import connectDB from "@/app/config/db";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    const { error } = userSignIn({ email, password });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.details[0].message,
        },
        { status: 400 }
      );
    }

    console.log(error);

    const existingUser = await Users.findOne({ email });

    if (!existingUser) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, error: "Invalid password" },
        { status: 401 }
      );
    }

    // check user email verification status
    if (!existingUser.isEmailVerified) {
      return NextResponse.json(
        { success: false, error: "Your email is not verified. Please check your Gmail inbox and click on the verification link we sent to activate your account." },
        { status: 403 }
      );
    }

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

    console.log("role: ", existingUser.role);

    return NextResponse.json(
      {
        success: true,
        message: "User signed in successfully",
        token,
        user: {
          id: existingUser._id,
          username: existingUser.username,
          email: existingUser.email,
          role: existingUser.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return serverErrorResponse("Sign in failed, please try again later!");
  }
}
