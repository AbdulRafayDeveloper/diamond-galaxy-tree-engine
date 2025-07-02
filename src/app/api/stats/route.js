import connectDB from "@/app/config/db";
import { Depositors } from "@/app/config/Models/Depositors/depositors";
import { Withdrawers } from "@/app/config/Models/Withdrawers/withdrawers";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const userId = user._id;

    const [depositStats, withdrawStats] = await Promise.all([
      Depositors.aggregate([
        { $match: { user_id: userId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
      Withdrawers.aggregate([
        { $match: { user_id: userId } },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
            totalAmount: { $sum: "$amount" },
          },
        },
      ]),
    ]);

    console.log("Deposit Stats:", depositStats);
    console.log("Withdraw Stats:", withdrawStats);

    const formatStats = (arr) => {
      const result = {
        pending: { count: 0, amount: 0 },
        accepted: { count: 0, amount: 0 },
        rejected: { count: 0, amount: 0 },
      };

      arr.forEach((item) => {
        const key = item._id?.toLowerCase();
        if (result[key]) {
          result[key] = {
            count: item.count,
            amount: item.totalAmount,
          };
        }
      });

      return result;
    };

    console.log("Formatted Deposit Stats:", formatStats(depositStats));
    console.log("Formatted Withdraw Stats:", formatStats(withdrawStats));
    

    return successResponse("Deposit and withdrawal summary fetched.", {
      deposits: formatStats(depositStats),
      withdrawals: formatStats(withdrawStats),
      accountBalance: user.accountBalance,
    });
  } catch (error) {
    console.error("Error in GET /api/deposit-withdraw-summary:", error);
    return serverErrorResponse("Internal server error.");
  }
}
