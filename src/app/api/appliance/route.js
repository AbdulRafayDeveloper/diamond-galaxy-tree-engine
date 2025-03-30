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

export async function POST(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const applianceData = await req.json();

    const { error } = validateAppliance(applianceData);
    if (error) return badRequestResponse(error.details[0].message);

    const property = await Properties.findOne({
      _id: applianceData.propertyId,
      subscriberId: homeowner._id,
    });

    if (!property) {
      return notFoundResponse("Property not found or access denied.");
    }

    const newAppliance = new Appliances(applianceData);

    const savedAppliance = await newAppliance.save();

    if (!savedAppliance) {
      return serverErrorResponse("Failed to save the appliance.");
    }

    return successResponse("Appliance added successfully.", {
      appliance: savedAppliance,
    });
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}

export async function GET(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const {
      name = "",
      maintenanceStatus = "",
      pageNumber = 1,
      pageSize = 5,
    } = Object.fromEntries(req.nextUrl.searchParams);

    const page = parseInt(pageNumber, 10);
    const size = parseInt(pageSize, 10);
    const skip = (page - 1) * size;

    const ownedProperties = await Properties.find({
      subscriberId: homeowner._id,
    }).select("_id");

    if (!ownedProperties || ownedProperties.length === 0) {
      return notFoundResponse("No properties found for this homeowner.");
    }

    const propertyIds = ownedProperties.map((property) => property._id);

    let filters = { propertyId: { $in: propertyIds } };

    if (name) {
      filters.applianceType = { $regex: name, $options: "i" };
    }

    if (maintenanceStatus) {
      filters.maintenanceStatus = maintenanceStatus;
    }

    const appliances = await Appliances.find(filters)
      .skip(skip)
      .limit(size)
      .populate("propertyId", "name address");

    const totalCount = await Appliances.countDocuments(filters);

    if (!appliances || appliances.length === 0) {
      return notFoundResponse("No appliances found.");
    }

    return successResponse("Appliances retrieved successfully.", {
      appliances,
      totalCount,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
