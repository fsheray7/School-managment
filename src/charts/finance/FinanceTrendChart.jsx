import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { trendChartData } from "../../data/finance/TrendChartData";

const data = trendChartData;

const FinanceTrendChart = () => {
  return (
    <div className="w-full bg-white p-2 md:p-6 rounded-xl shadow-sm border-t-5 border-[#0C46C4] flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-800">
          Monthly Fee Collection
        </h3>
        <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
          +12% from last month
        </span>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0C46C4" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#0C46C4" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f0f0f0"
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: "#9ca3af" }}
              tickFormatter={(value) => `${value / 1000000}M`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "10px",
                border: "none",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
              }}
              formatter={(value) => [
                `PKR ${value.toLocaleString()}`,
                "Collection",
              ]}
            />
            <Area
              type="monotone"
              dataKey="collection"
              stroke="#0C46C4"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorCollection)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FinanceTrendChart;
