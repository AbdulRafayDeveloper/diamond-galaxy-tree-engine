import { NextResponse } from "next/server";
import connectDB from "@/app/config/db";
import { LuckyDraw } from "@/app/config/Models/Lucky-draw/Lucky-Draw-Info/lucky-draw-info";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
  conflictResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";

// export async function GET(req, context) {
//   try {
//     await connectDB();

//     const token = serverSideValidations.checkTokenValidationStyle(req);
//     const adminUser = await serverSideValidations.validateUserByToken(token);

//     if (!adminUser || !adminUser._id) {
//       return badRequestResponse("Unauthorized. Invalid or missing token.");
//     }

//     if (adminUser.role !== "admin") {
//       return conflictResponse("Access denied. Admins only.");
//     }

//     const params = await context.params;
//     const { type } = params;
//     console.log("the type at backend is:", type);

//     const draw = await LuckyDraw.findOne({ type });

//     if (!draw) {
//       return successResponse("Lucky draw not found for this type.");
//     }

//     return successResponse("Lucky draw fetched successfully.", draw);
//   } catch (error) {
//     console.log("Error in GET /api/admin/lucky-draw/[type]:", error);
//     return serverErrorResponse("Internal server error.");
//   }
// }

// export async function GET(req, context) {
//   try {
//     await connectDB();

//     const token = serverSideValidations.checkTokenValidationStyle(req);
//     const adminUser = await serverSideValidations.validateUserByToken(token);

//     if (!adminUser || !adminUser._id) {
//       return badRequestResponse("Unauthorized. Invalid or missing token.");
//     }

//     if (adminUser.role !== "admin") {
//       return conflictResponse("Access denied. Admins only.");
//     }

//     const params = await context.params;
//     const { type } = params;

//     console.log("the type at backend is:", type);

//     // Get all draws of this type
//     const draws = await LuckyDraw.find({ type });

//     if (!draws.length) {
//       return successResponse("No lucky draw found for this type.");
//     }

//     // Pick a random one
//     const draw = draws[Math.floor(Math.random() * draws.length)];

//     // Fetch participants
//     const participants = await LuckyDraw.find({ type: type });

//     const totalParticipants = participants.length;
//     const totalCollected = participants.reduce((sum, p) => sum + (p.price || 0), 0);

//     console.log("Total Participants:", totalParticipants);
//     console.log("Total Collected Amount:", totalCollected);
//     console.log("Participants:", participants);

//     return successResponse("Lucky draw fetched successfully.", {
//       draw,
//       totalParticipants,
//       totalCollected,
//       participants,
//     });
//   } catch (error) {
//     console.log("Error in GET /api/admin/lucky-draw/[type]:", error);
//     return serverErrorResponse("Internal server error.");
//   }
// }

export async function GET(req, context) {
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

    const { type } = context.params;

    // Get all lucky draws of this type
    const draws = await LuckyDraw.find({ type });

    if (!draws.length) {
      return successResponse("No lucky draw found for this type.");
    }

    // Pick one random draw
    const draw = draws[Math.floor(Math.random() * draws.length)];

    // Get participants from that draw
    const participants = draw.participants || [];

    // Total number of participants
    const totalParticipants = participants.length;

    // Total collected amount
    const totalCollected = participants.reduce((sum, p) => sum + (p.total || 0), 0);

    // Pick a random participant if any exist
    const winner = participants.length
      ? participants[Math.floor(Math.random() * participants.length)]
      : null;

    return successResponse("Lucky draw fetched successfully.", {
      draw,
      totalParticipants,
      totalCollected,
      winner,
      participants,
    });
  } catch (error) {
    console.log("Error in GET /api/admin/lucky-draw/[type]:", error);
    return serverErrorResponse("Internal server error.");
  }
}

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

    const params = await context.params;
    const { type } = params;
    const body = await req.json();

    const allowedFields = ["price", "drawDate", "levelOnePercentage"];
    const invalidFields = Object.keys(body).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return badRequestResponse(
        `Invalid field(s) in request: ${invalidFields.join(", ")}`
      );
    }

    let draw = await LuckyDraw.findOne({ type });

    if (draw) {
      if (body.price !== undefined) draw.price = body.price;
      if (body.drawDate !== undefined) draw.drawDate = body.drawDate;
      if (body.levelOnePercentage !== undefined)
        draw.levelOnePercentage = body.levelOnePercentage;
      await draw.save();

      return successResponse("Lucky draw updated successfully.", draw);
    } else {
      const newDraw = new LuckyDraw({
        type,
        price: body.price,
        drawDate: body.drawDate,
        levelOnePercentage: body.levelOnePercentage,
        participants: [],
      });

      await newDraw.save();
      return successResponse("Lucky draw created successfully.", newDraw);
    }
  } catch (error) {
    console.log("Error in PUT /api/admin/lucky-draw/[type]:", error);
    return serverErrorResponse("Internal server error.");
  }
}

export async function DELETE(req, context) {
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

    const { type } = context.params;

    const draw = await LuckyDraw.findOneAndDelete({ type });

    if (!draw) {
      return notFoundResponse("No lucky draw found for the given type.");
    }

    return successResponse("Lucky draw deleted successfully.");
  } catch (error) {
    console.log("Error in DELETE /api/admin/lucky-draw/[type]:", error);
    return serverErrorResponse("Internal server error.");
  }
}
