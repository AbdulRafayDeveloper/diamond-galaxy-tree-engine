import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
    successResponse,
    badRequestResponse,
    serverErrorResponse,
    conflictResponse,
    notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import bcrypt from "bcryptjs";

export async function PUT(req, context) {
    try {
        await connectDB();

        const token = serverSideValidations.checkTokenValidationStyle(req);
        const adminUser = await serverSideValidations.validateUserByToken(token);

        if (!adminUser || !adminUser._id) {
            return badRequestResponse("Unauthorized. Invalid or missing token.");
        }

        if (adminUser.role !== "admin") {
            return conflictResponse("Access denied. Admins only.");
        }

        const { id } = context.params;

        const checkUser = await Users.findById(id);

        if (!checkUser) {
            return notFoundResponse("User not found.");
        }

        const newPassword = "@User123";

        if (!newPassword || newPassword.length < 6) {
            return badRequestResponse("New password must be at least 6 characters long.");
        }

        const user = await Users.findById(id);

        if (!user) {
            return notFoundResponse("User not found.");
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;

        await user.save();

        return successResponse("Password reset successfully.", {
            userId: user._id,
            email: user.email,
        });
    } catch (error) {
        console.error("Error in PUT /api/admin/reset-password/[id]:", error);
        return serverErrorResponse("Internal server error.");
    }
}
