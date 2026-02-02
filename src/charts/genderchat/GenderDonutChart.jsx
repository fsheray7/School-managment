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
          color: "#0C46C4",
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
      className={`w-full max-w-sm bg-white rounded-2xl p-6 shadow hover:scale-102 border-t-5 border-[#0C46C4] hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Top Labels */}
      <div className="flex justify-between text-sm mb-2">
        <div className="text-center mb-3">
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
      <div className="w-full h-56 min-h-[220px] min-w-0">
        <ResponsiveContainer width="100%" height="100%">
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
      <div className="flex justify-center gap-4 text-sm">
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
