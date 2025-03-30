import { NextResponse } from "next/server";
import { Contractor } from "@/app/config/Models/Contractor/contractor";
import serverSideHomeOwnerValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateContractor } from "@/app/helper/validateContractor";
import { HomeInventories } from "@/app/config/Models/HomeInventories/homeinventory";

export async function GET(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const id = new URL(req.url).pathname.split("/").pop();

    const contractor = await Contractor.findOne({
      _id: id,
      subscriberId: homeowner._id,
    });

    if (!contractor) {
      return notFoundResponse("Contractor not found or access denied.");
    }

    return successResponse("Contractor retrieved successfully.", contractor);
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}

export async function PUT(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const id = new URL(req.url).pathname.split("/").pop();

    const contractor = await Contractor.findOne({
      _id: id,
      subscriberId: homeowner._id,
    });
    if (!contractor) {
      return notFoundResponse("Contractor not found or access denied.");
    }

    const updateData = await req.json();

    const { error } = validateContractor(updateData);
    if (error) return badRequestResponse(error.details[0].message);

    const updatedContractor = await Contractor.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      }
    );

    return successResponse(
      "Contractor updated successfully.",
      updatedContractor
    );
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}

export async function DELETE(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const id = new URL(req.url).pathname.split("/").pop();

    const contractor = await Contractor.findOne({
      _id: id,
      subscriberId: homeowner._id,
    });

    if (!contractor) {
      return notFoundResponse("Contractor not found or access denied.");
    }

    await Contractor.findByIdAndDelete(id);

    await HomeInventories.updateMany(
      { contractorId: id },
      { $set: { contractorId: null, contractorName: "No Name" } }
    );

    return successResponse(
      "Contractor deleted successfully. Home Inventories updated."
    );
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
