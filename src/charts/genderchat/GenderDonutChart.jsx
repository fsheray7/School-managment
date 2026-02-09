import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import studentsData from "../../data/admindata/students/students";

const GenderDonutChart = ({ className }) => {
  // Calculate gender stats dynamically
  const genderStats = useMemo(() => {
    const total = studentsData.length;
    const maleCount = studentsData.filter((s) => s.gender === "Male").length;
    const femaleCount = studentsData.filter(
      (s) => s.gender === "Female",
    ).length;

    const malePercentage =
      total > 0 ? Math.round((maleCount / total) * 100) : 0;
    const femalePercentage =
      total > 0 ? Math.round((femaleCount / total) * 100) : 0;

    return {
      data: [
        {
          name: "Male",
          value: malePercentage,
          count: maleCount,
          color: "var(--primary-color)",
        },
        {
          name: "Female",
          value: femalePercentage,
          count: femaleCount,
          color: "#fa2867ff",
        },
      ],
      malePercentage,
      femalePercentage,
      maleCount,
      femaleCount,
    };
  }, []);

  const { data, malePercentage, femalePercentage } = genderStats;

  return (
    <div
      className={`w-full md:max-w-xs bg-white rounded-2xl py-1 px-6 shadow hover:scale-102 border-t-5 hover:shadow-lg transition-all duration-300 ${className}`}
      style={{ borderTopColor: "var(--primary-color)" }}
    >
      <h3 className="text-base sm:text-lg  font-bold text-[var(--text-primary-color)]">
          Gender Chart
        </h3>
      {/* Top Labels */}
      <div className="flex justify-between text-sm">
        <div className="text-center ">
          <p className="text-sm font-semibold text-black">{malePercentage}%</p>
          <p className="text-blue-500 text-md">
            <IoMdMale />
          </p>
        </div>
        <div className="text-gray-500 text-center">
          <p className="font-semibold text-black">{femalePercentage}%</p>
          <p className="text-red-500 text-md">
            <IoMdFemale />
          </p>
        </div>
      </div>

      {/* Donut Chart */}
      <div className="relative w-full h-56 min-h-[220px] min-w-0">
        <ResponsiveContainer
          width="100%"
          height="100%"
          minWidth={0}
          minHeight={0}
        >
          <PieChart>
            <Pie
              data={data}
              innerRadius={65}
              outerRadius={85}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom Label */}

      {/* Legend */}
      <div className="flex mt-6 justify-center gap-4 text-sm">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: item.color }}
            ></span>
            <span className="text-gray-600">
              {item.name} {item.value}% ({item.count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GenderDonutChart;
