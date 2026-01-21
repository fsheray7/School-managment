import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
} from "recharts";

import data from "../../data/chartdata/managementvalue/data";


const ManagementValueChart = ({ className }) => {
  return (
    <div className={`w-full bg-white rounded-2xl p-4 sm:p-6 hover:scale-102 hover:shadow-lg transition-all duration-300 shadow ${className}`}>
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Management Value
        </h3>

        {/* Legend Pills */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-xs">
          <span className="px-2 py-1 md:px-3 rounded-full border border-purple-400 text-purple-500">
            Earning
          </span>
          <span className="px-2 py-1 md:px-3 rounded-full border border-cyan-400 text-cyan-500">
            Absent
          </span>
          <span className="px-2 py-1 md:px-3 rounded-full bg-orange-400 text-white">
            Present
          </span>
        </div>
      </div>

      {/* Chart */}
      <div className="w-full h-56 sm:h-64 min-h-[220px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" tickLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />

            {/* Background soft area (present) */}
            <Area
              type="monotone"
              dataKey="present"
              fill="rgba(251,146,60,0.15)"
              stroke="none"
            />

            <Line
              type="monotone"
              dataKey="earning"
              stroke="#A78BFA"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="absent"
              stroke="#22D3EE"
              strokeWidth={2}
              dot={false}
            />

            <Line
              type="monotone"
              dataKey="present"
              stroke="#FB923C"
              strokeWidth={3}
              dot={{ r: 5, strokeWidth: 2, fill: "#FB923C" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManagementValueChart;
