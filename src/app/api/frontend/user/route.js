import connectDB from "@/app/config/db";
import { Users } from "@/app/config/Models/Users/users";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import { uploadAndGeneratePublicUrl } from "@/app/helper/Url-Generator/googledrive";
import { v4 as uuidv4 } from "uuid";
import { updateAndGeneratePublicUrl } from "@/app/helper/Url-Generator/updateimage";
import { updateFileOnS3 } from "@/app/helper/S3-Storage/s3helper";

export async function PUT(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const formData = await req.formData();
    const fname = formData.get("fname");
    const lname = formData.get("lname");
    const username = formData.get("username");
    const phoneno = formData.get("phoneno");
    const file = formData.get("image");

    if (username && username !== user.username) {
      const existing = await Users.findOne({
        username,
        _id: { $ne: user._id },
      });
      if (existing) {
        return badRequestResponse("Username is already taken.");
      }
    }

    const updatedFields = {
      ...(fname && { fname }),
      ...(lname && { lname }),
      ...(username && { username }),
      ...(phoneno && { phoneno }),
    };

    if (file && typeof file === "object" && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const ext = file.name.split(".").pop();
      const contentType = file.type || "image/jpeg";

      const imageUrl = await updateFileOnS3(
        user.image, // old image URL to delete
        buffer, // new image buffer
        "profile-images", // folder in S3
        ext, // file extension
        contentType // MIME type
      );

      console.log(imageUrl);

      updatedFields.image = imageUrl;
    }

    const updatedUser = await Users.findByIdAndUpdate(
      user._id,
      { $set: updatedFields },
      { new: true }
    );

    if (!updatedUser) {
      return notFoundResponse("User not found.");
    }

    return successResponse("User updated successfully.", updatedUser);
  } catch (error) {
    console.error("Error in PUT /api/user:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function GET(req, res) {
  try {
    await connectDB();
    const token = serverSideValidations.checkTokenValidationStyle(req);
    console.log(token);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (user.status) return user;

    const foundUser = await Users.findById(user._id).populate("referrerId");

    if (!foundUser) {
      return notFoundResponse("User not found.", null);
    }

    console.log(foundUser);

    return successResponse("User retrieved successfully.", foundUser);
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
