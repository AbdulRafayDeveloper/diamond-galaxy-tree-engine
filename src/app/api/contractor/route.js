import { NextResponse } from "next/server";
import { Contractor } from "@/app/config/Models/Contractor/contractor";
import { Subscribers } from "@/app/config/Models/Subscriber/subscribers";
import serverSideHomeOwnerValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  serverErrorResponse,
  notFoundResponse,
} from "@/app/helper/apiResponseHelpers";
import { validateContractor } from "@/app/helper/validateContractor";

export async function GET(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const {
      search = "",
      pageNumber = 1,
      pageSize = 5,
    } = Object.fromEntries(req.nextUrl.searchParams);

    const page = parseInt(pageNumber, 10);
    const size = parseInt(pageSize, 10);
    const skip = (page - 1) * size;

    const filters = search
      ? {
          companyName: { $regex: search, $options: "i" },
          subscriberId: homeowner._id,
        }
      : { subscriberId: homeowner._id };

    const contractors = await Contractor.find(filters).skip(skip).limit(size);
    const totalContractorsCount = await Contractor.countDocuments(filters);

    if (!contractors || contractors.length === 0) {
      return notFoundResponse("No contractors found.");
    }

    return successResponse("Contractors retrieved successfully.", {
      contractors,
      totalContractorsCount,
      pageNumber: page,
      pageSize: size,
    });
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}

export async function POST(req) {
  try {
    const token = serverSideHomeOwnerValidation.extractAuthToken(req);
    if (typeof token !== "string") return token;

    const homeowner =
      await serverSideHomeOwnerValidation.validateHomeownerByToken(token);
    if (homeowner.status) return homeowner;

    const subscriberId = homeowner.id;

    const subscriber = await Subscribers.findOne({ userId: subscriberId });
    if (!subscriber) {
      return notFoundResponse("Subscriber record not found.");
    }

    const contractorData = await req.json();

    const { error } = validateContractor(contractorData);
    if (error) return badRequestResponse(error.details[0].message);

    const newContractor = new Contractor({
      ...contractorData,
      subscriberId,
    });

    const savedContractor = await newContractor.save();
    if (!savedContractor) {
      return serverErrorResponse("Failed to save the contractor.");
    }

    return successResponse("Contractor added successfully.", {
      contractor: savedContractor,
    });
  } catch (error) {
    return serverErrorResponse(error.message);
  }
}
