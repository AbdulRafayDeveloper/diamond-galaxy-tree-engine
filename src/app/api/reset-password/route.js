import { Users } from "@/app/config/Models/Users/users";
import db from "@/app/config/db";
import bcrypt from "bcrypt";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
  conflictResponse,
  unauthorizedResponse,
} from "@/app/helper/apiResponseHelpers";
import serverSideValidations from "@/app/helper/serverSideValidations";

export async function POST(req = null, res = null) {
  try {
    const body = await req.json();
    const decodedToken = serverSideValidations.verifyEmailToken(req);
    console.log("decodedToken:", decodedToken);
    const { email } = decodedToken;
    const { newPassword, confirmPassword } = body;

    console.log("newPassword:", newPassword);
    console.log("confirmPassword:", confirmPassword);
    console.log("email:", email);

    if (!newPassword || !confirmPassword) {
      return badRequestResponse(res, "Both newPassword and confirmPassword are required", null);
    }

    if (newPassword !== confirmPassword) {
      return badRequestResponse(res, "New password and confirm password do not match", null);
    }

    const user = await Users.findOne({ email });

    console.log("user:", user);

    if (!user) {
      return notFoundResponse("No user found with this email", null);
    }

    const isMatch = await bcrypt.compare(newPassword, user.password);

    console.log("isMatch:", isMatch);

    if (isMatch) {
      console.log("New password must be different from the previous password");
      return conflictResponse("New password must be different from the previous password", null);
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    const updatedUser = await user.save();

    console.log("updatedUser:", updatedUser);

    if (!updatedUser) {
      return serverErrorResponse("Unable to reset password. Please try again later");
    }

    console.log("Password has been successfully reset");
    return successResponse("Password has been successfully reset", null);
  } catch (error) {
    return serverErrorResponse("Internal server error. Please try again later!", error.message);
  }
}
