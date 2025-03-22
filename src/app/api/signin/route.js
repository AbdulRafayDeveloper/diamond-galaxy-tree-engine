import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userSignIn } from "@/app/helper/userSignIn";
import { Users } from "@/app/config/Models/Users/users";
import db from "@/app/config/db";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    const { error } = userSignIn({ email, password });
    if (error) {
      console.log("🧪 Joi validation error:", error.details);
      return NextResponse.json(
        {
          success: false,
          error: error.details.map((d) => d.message).join(", "),
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

    const token = jwt.sign(
      {
        id: existingUser._id,
        email: existingUser.email,
        role: existingUser.role,
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );

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
