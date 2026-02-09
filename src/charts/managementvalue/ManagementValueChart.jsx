import React from "react";
import {
  ComposedChart,
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
        <h3 className="text-base sm:text-lg px-4 font-bold text-[var(--text-primary-color)]">
          Management Value
        </h3>

        {/* Legend Buttons */}
        <div className="flex flex-wrap justify-center sm:justify-end px-3 gap-2 text-xs">
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
            className={`px-3 py-1 rounded-full transition-colors cursor-pointer duration-200 border`}
            style={{
              backgroundColor: visibleSeries.absent
                ? "var(--secondary-color)"
                : "transparent",
              color: visibleSeries.absent ? "white" : "var(--secondary-color)",
              borderColor: "var(--secondary-color)",
            }}
          >
            Absent
          </button>
        </div>
      </div>

      {/* Chart */}
      <div className="relative w-full h-56 sm:h-64 min-h-[220px] min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <ComposedChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              horizontal={false}
            />
            <XAxis dataKey="week" tickLine={true} />
            <YAxis tickLine={true} axisLine={true} />
            <Tooltip />

            {visibleSeries.present && (
              <Area
                type="monotone"
                dataKey="present"
                stroke="var(--primary-color)"
                strokeWidth={3}
                fill="rgba(18, 50, 233, 0.15)"
                dot={{ r: 3, strokeWidth: 2, fill: "#eeebebff" }}
                activeDot={{ r: 5 }}
              />
            )}

            {visibleSeries.absent && (
              <Line
                type="monotone"
                dataKey="absent"
                stroke="var(--secondary-color)"
                activeDot={{ r: 5 }}
                strokeWidth={2}
                dot={true}
              />
            )}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ManagementValueChart;
