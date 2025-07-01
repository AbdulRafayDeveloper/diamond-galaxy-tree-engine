import connectDB from "@/app/config/db";
import { Transaction } from "@/app/config/Models/Transaction/transaction";
import serverSideValidations from "@/app/helper/serverSideValidations";
import serverSideUserValidation from "@/app/helper/serverSideUserValidation";
import {
  successResponse,
  badRequestResponse,
  serverErrorResponse,
} from "@/app/helper/apiResponseHelpers";
import mongoose from "mongoose";

// export async function GET(req) {
//   try {
//     await connectDB();

//     const token = serverSideValidations.checkTokenValidationStyle(req);
//     const user = await serverSideUserValidation.validateUserByToken(token);

//     if (!user || !user._id) {
//       return badRequestResponse("Unauthorized. Invalid or missing token.");
//     }

//     const incomeTypes = [
//       "activation",
//       "registration",
//       "slot purchase",
//       "luckyDraw",
//       "commission",
//       "monthly_gift",
//     ];

//     const twelveMonthsAgo = new Date();
//     twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
//     twelveMonthsAgo.setDate(1);

//     const data = await Transaction.aggregate([
//       {
//         $match: {
//           userId: new mongoose.Types.ObjectId(user._id),
//           type: { $in: incomeTypes },
//           createdAt: { $gte: twelveMonthsAgo },
//         },
//       },
//       {
//         $group: {
//           _id: {
//             month: { $month: "$createdAt" },
//             year: { $year: "$createdAt" },
//           },
//           revenue: { $sum: "$amount" },
//         },
//       },
//       {
//         $project: {
//           month: {
//             $concat: [
//               {
//                 $arrayElemAt: [
//                   [
//                     "",
//                     "Jan",
//                     "Feb",
//                     "Mar",
//                     "Apr",
//                     "May",
//                     "Jun",
//                     "Jul",
//                     "Aug",
//                     "Sep",
//                     "Oct",
//                     "Nov",
//                     "Dec",
//                   ],
//                   "$_id.month",
//                 ],
//               },
//               " ",
//               { $toString: "$_id.year" },
//             ],
//           },
//           revenue: 1,
//           _id: 0,
//         },
//       },
//       { $sort: { month: 1 } },
//     ]);

//     return successResponse("Income data fetched.", data);
//   } catch (error) {
//     console.error("Error fetching monthly income:", error);
//     return serverErrorResponse("Something went wrong");
//   }
// }

export async function GET(req) {
  try {
    await connectDB();

    const token = serverSideValidations.checkTokenValidationStyle(req);
    const user = await serverSideUserValidation.validateUserByToken(token);

    if (!user || !user._id) {
      return badRequestResponse("Unauthorized. Invalid or missing token.");
    }

    const incomeTypes = [
      "activation",
      "registration",
      "slot purchase",
      "luckyDraw",
      "commission",
      "monthly_gift",
    ];

    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 11);
    twelveMonthsAgo.setDate(1);

    const data = await Transaction.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(user._id),
          type: { $in: incomeTypes },
          createdAt: { $gte: twelveMonthsAgo },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          revenue: { $sum: "$amount" },
        },
      },
      {
        $project: {
          month: {
            $concat: [
              {
                $arrayElemAt: [
                  [
                    "",
                    "Jan",
                    "Feb",
                    "Mar",
                    "Apr",
                    "May",
                    "Jun",
                    "Jul",
                    "Aug",
                    "Sep",
                    "Oct",
                    "Nov",
                    "Dec",
                  ],
                  "$_id.month",
                ],
              },
              " ",
              { $toString: "$_id.year" },
            ],
          },
          revenue: 1,
          _id: 0,
        },
      },
    ]);

    // 🔥 Map data for fast lookup
    const dataMap = {};
    data.forEach((item) => {
      dataMap[item.month] = item.revenue;
    });

    // 🔥 Create last 12 months array
    const last12Months = [];
    const currentDate = new Date();

    for (let i = 11; i >= 0; i--) {
      const d = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const month = d.toLocaleString("default", { month: "short" });
      const year = d.getFullYear();
      const key = `${month} ${year}`;

      last12Months.push({
        month: key,
        revenue: dataMap[key] || 0,
      });
    }

    return successResponse("Income data fetched.", last12Months);
  } catch (error) {
    console.error("Error fetching monthly income:", error);
    return serverErrorResponse("Something went wrong");
  }
}
