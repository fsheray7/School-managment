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

import { managementChartData } from "../../data/finance/ManagementChartData";

const data = managementChartData;

const ManagementValueChart = ({ className }) => {
  const [visibleSeries, setVisibleSeries] = React.useState({
    absent: true,
    present: true,
  });

  const toggleSeries = (series) => {
    setVisibleSeries((prev) => {
      // If the clicked series is the ONLY one currently visible, show ALL
      if (prev[series] && !prev[series === "absent" ? "present" : "absent"]) {
        return { absent: true, present: true };
      }
      // Otherwise, show ONLY the clicked series
      return {
        absent: series === "absent",
        present: series === "present",
      };
    });
  };

  return (
    <div
      className={`w-full bg-white rounded-2xl py-3 px-2 hover:scale-102 hover:shadow-lg transition-all duration-300 shadow border-t-5 ${className}`}
      style={{ borderTopColor: "var(--primary-color)" }}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
          Management Value
        </h3>

        {/* Legend Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-xs">
          <button
            onClick={() => toggleSeries("present")}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer duration-200 border`}
            style={{
              backgroundColor: visibleSeries.present
                ? "var(--primary-color)"
                : "transparent",
              color: visibleSeries.present ? "white" : "var(--primary-color)",
              borderColor: "var(--primary-color)",
            }}
          >
            Present
          </button>
          <button
            onClick={() => toggleSeries("absent")}
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer duration-200 border ${
              visibleSeries.absent
                ? "bg-cyan-400 text-white border-cyan-400"
                : "border-cyan-400 text-cyan-500 hover:bg-cyan-50"
            }`}
          >
            Absent
          </button>
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

            {/* Background soft area (present) - Only show if present is visible */}
            {visibleSeries.present && (
              <Area
                type="monotone"
                dataKey="present"
                fill="rgba(251,146,60,0.15)"
                stroke="none"
              />
            )}

            {visibleSeries.absent && (
              <Line
                type="monotone"
                dataKey="absent"
                stroke="#22D3EE"
                strokeWidth={2}
                dot={false}
              />
            )}

            {visibleSeries.present && (
              <Line
                type="monotone"
                dataKey="present"
                stroke="#FB923C"
                strokeWidth={3}
                dot={{ r: 5, strokeWidth: 2, fill: "#FB923C" }}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManagementValueChart;
