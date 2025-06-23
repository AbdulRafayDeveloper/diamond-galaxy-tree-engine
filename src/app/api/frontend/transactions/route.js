import connectDB from "@/app/config/db";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import serverSideValidations from "@/app/helper/serverSideValidations";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import { Transaction } from "@/app/config/Models/Transaction/transaction";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const transactions = await Transaction.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    return successResponse("Transactions fetched successfully.", {
      transactions,
    });
  } catch (error) {
    console.error("Error in GET /api/transactions:", error);
    return serverErrorResponse("Internal server error.");
  }
}
