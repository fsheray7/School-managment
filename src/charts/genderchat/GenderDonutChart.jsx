import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
} from "recharts";
import { FaFemale, FaMale } from "react-icons/fa";
import data from "../../data/chartdata/attendancedata/attendance";
import { IoMdFemale, IoMdMale } from "react-icons/io";

const GenderDonutChart = ({ className }) => {
    return (
        <div className={`w-full max-w-sm bg-white rounded-2xl p-6 shadow hover:scale-102 md:border-t-8 border-[#0C46C4] hover:shadow-lg transition-all duration-300 ${className}`}>

            {/* Top Labels */}
            <div className="flex justify-between text-sm mb-2">
                <div className="text-center mb-3">
                    <p className="text-sm font-semibold text-black">60%</p>
                    <p className="text-blue-500 text-md"><IoMdMale /></p>
                </div>
                <div className="text-gray-500 text-center">
                    <p className="font-semibold text-black">35%</p>
                    <p className="text-red-500 text-md"><IoMdFemale /></p>
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
                            {item.name} {item.value}%
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GenderDonutChart;
