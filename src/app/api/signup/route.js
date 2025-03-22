import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Users } from "@/app/config/Models/Users/users";
import { db } from "@/app/config/db";
import { validateUser } from "@/app/helper/validateUser";

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(req) {
  try {
    const {
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      password,
    } = await req.json();

    const { error } = validateUser({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      password,
    });

    if (error) {
      return NextResponse.json(
        {
          success: false,
          error: error.details[0].message,
        },
        { status: 400 }
      );
    }

    const existingUser = await Users.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Users({
      firstName,
      lastName,
      username,
      email,
      phoneNumber,
      country,
      password: hashedPassword,
      role: "user",
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Failed to save the user. Please try again.",
        },
        { status: 500 }
      );
    }

    const token = jwt.sign(
      { id: newUser._id, name: newUser.username, role: newUser.role },
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
    return NextResponse.json(
      {
        success: false,
        error: "Signup failed. Please try again later.",
      },
      { status: 500 }
    );
  }
}
