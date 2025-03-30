import { NextResponse } from "next/server";
import { HomeInventories } from "@/app/config/Models/HomeInventories/homeinventory";
import { Properties } from "@/app/config/Models/Property/property";
import { Contractor } from "@/app/config/Models/Contractor/contractor";
import serverSideHomeOwnerValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateHomeInventory } from "@/app/helper/validatehomeInventory";

export async function GET(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const id = new URL(req.url).pathname.split("/").pop();

    const homeInventory = await HomeInventories.findOne({ _id: id });

    if (!homeInventory) {
      return notFoundResponse("Home Inventory not found.");
    }

    const property = await Properties.findOne({
      _id: homeInventory.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this inventory."
      );
    }

    return successResponse(
      "Home Inventory retrieved successfully.",
      homeInventory
    );
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

    const homeInventory = await HomeInventories.findOne({ _id: id });

    if (!homeInventory) {
      return notFoundResponse("Home Inventory not found.");
    }

    const property = await Properties.findOne({
      _id: homeInventory.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this inventory."
      );
    }

    const updateData = await req.json();

    const { error } = validateHomeInventory(updateData);
    if (error) return badRequestResponse(error.details[0].message);

    const updatedHomeInventory = await HomeInventories.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return successResponse(
      "Home Inventory updated successfully.",
      updatedHomeInventory
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

    const homeInventory = await HomeInventories.findOne({ _id: id });

    if (!homeInventory) {
      return notFoundResponse("Home Inventory not found.");
    }

    const property = await Properties.findOne({
      _id: homeInventory.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this inventory."
      );
    }

    await HomeInventories.findByIdAndDelete(id);

    return successResponse("Home Inventory deleted successfully.");
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
