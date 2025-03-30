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

export async function POST(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const inventoryData = await req.json();

    const { error } = validateHomeInventory(inventoryData);
    if (error) return badRequestResponse(error.details[0].message);

    const {
      propertyId,
      contractorId,
      roomNo,
      brand,
      dateCompleted,
      contractorName,
      color,
      additionalNotes,
      name,
    } = inventoryData;

    const property = await Properties.findOne({
      _id: propertyId,
      subscriberId: homeowner.id,
    });
    if (!property) {
      return notFoundResponse("Property not found or access denied.");
    }

    let validContractor = null;
    if (contractorId) {
      validContractor = await Contractor.findOne({
        _id: contractorId,
        subscriberId: homeowner.id,
      });
      if (!validContractor) {
        return notFoundResponse("Contractor not found or access denied.");
      }
    }

    const newHomeInventory = new HomeInventories({
      propertyId,
      contractorId: validContractor ? validContractor._id : null,
      roomNo,
      brand,
      dateCompleted,
      contractorName,
      color,
      additionalNotes,
      name,
    });

    const savedHomeInventory = await newHomeInventory.save();
    if (!savedHomeInventory) {
      return serverErrorResponse("Failed to save the Home Inventory.");
    }

    return successResponse("Home Inventory added successfully.", {
      homeInventory: savedHomeInventory,
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
      filters.name = { $regex: name, $options: "i" };
    }

    const homeInventories = await HomeInventories.find(filters)
      .skip(skip)
      .limit(size);

    const totalCount = await HomeInventories.countDocuments(filters);

    if (!homeInventories || homeInventories.length === 0) {
      return notFoundResponse("No home inventories found.");
    }

    return successResponse("Home inventories retrieved successfully.", {
      homeInventories,
      totalCount,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
