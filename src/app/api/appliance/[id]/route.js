import { NextResponse } from "next/server";
import { Appliances } from "@/app/config/Models/Appliances/appliances";
import { Properties } from "@/app/config/Models/Property/property";
import serverSideHomeOwnerValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
  badRequestResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateHomeInventory } from "@/app/helper/validatehomeInventory";
import db from "@/app/config/db";
import { validateAppliance } from "@/app/helper/validateAppliance";

export async function GET(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const id = new URL(req.url).pathname.split("/").pop();

    const appliance = await Appliances.findOne({ _id: id }).populate(
      "propertyId"
    );

    if (!appliance) {
      return notFoundResponse("Appliance not found.");
    }

    const property = await Properties.findOne({
      _id: appliance.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this appliance."
      );
    }

    return successResponse("Appliance retrieved successfully.", appliance);
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

    const appliance = await Appliances.findOne({ _id: id }).populate(
      "propertyId"
    );

    if (!appliance) {
      return notFoundResponse("Appliance not found.");
    }

    const property = await Properties.findOne({
      _id: appliance.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this appliance."
      );
    }

    const updateData = await req.json();

    const { error } = validateAppliance(updateData);
    if (error) return badRequestResponse(error.details[0].message);

    const updatedAppliance = await Appliances.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return successResponse("Appliance updated successfully.", updatedAppliance);
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

    const appliance = await Appliances.findOne({ _id: id }).populate(
      "propertyId"
    );

    if (!appliance) {
      return notFoundResponse("Appliance not found.");
    }

    const property = await Properties.findOne({
      _id: appliance.propertyId,
      subscriberId: homeowner._id,
    });
    if (!property) {
      return unauthorizedResponse(
        "Access denied. You do not own this appliance."
      );
    }

    await Appliances.findByIdAndDelete(id);

    return successResponse("Appliance deleted successfully.");
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
