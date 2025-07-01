"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import Cookies from "js-cookie";
import { useState, useEffect } from "react";

const Page = () => {
  const [Data, setData] = useState([]);
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  useEffect(() => {
    const fetchIncome = async () => {
      try {
        const res = await axios.get("/api/graph", {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        });
        console.log(res);
        if (res.data.status === 200) {
          setData(res.data.data);
          // const apiData = res.data.data; // [{ month: "Jan", revenue: 1000 }, ...]

          // // Merge
          // const mergedData = months.map(month => {
          //   const found = apiData.find(item => item.month === month);
          //   return {
          //     month,
          //     revenue: found ? found.revenue : 0,
          //   };
          // });

          // setData(mergedData);
        }
      } catch (err) {
        console.error("Failed to load income data", err);
      }
    };

    fetchIncome();
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-screen-xl mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Monthly Revenue (Last 12 Months)
      </h2>
      {/* <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={Data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer> */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={Data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 5 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
};

export default Page;
