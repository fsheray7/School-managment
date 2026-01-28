import React from "react";
import data from "../../../data/admindata/carddata/AdminData";

const Cards = () => {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-2">
      <div className="flex flex-row items-center justify-start md:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 px-2 min-w-max md:min-w-0">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between p-3 sm:p-4 w-[160px] sm:w-[200px] md:w-[240px] lg:w-[260px] border-t-8 border-[#0C46C4] rounded-xl shadow-lg bg-white hover:scale-105 transition-all duration-300 cursor-default"
            >
              {/* Left side - Title and Total */}
              <div className="flex flex-col items-start justify-center gap-1">
                <h2 className="text-[#0C46C4] font-bold text-lg sm:text-xl md:text-2xl">
                  {item.total}
                </h2>
                <span className="text-[10px] sm:text-xs md:text-sm font-bold uppercase text-gray-400 tracking-wider">
                  {item.title}
                </span>
              </div>

              {/* Right side - Icon */}
              <div className="rounded-full p-2 sm:p-3 bg-blue-50 text-[#0C46C4] flex items-center justify-center text-xl sm:text-2xl md:text-3xl">
                <Icon />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Cards;
