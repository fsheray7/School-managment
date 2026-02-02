import React from "react";
import data from "../../../data/admindata/carddata/AdminData";

const Cards = () => {
  return (
    <div className="w-full">
      <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6 w-full">
        {data.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="flex flex-row items-center justify-between p-2 md:p-4 sm:p-5 w-full border-t-[6px] border-[#0C46C4] rounded-xl shadow-sm bg-white hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default"
            >
              {/* Left side - Title and Total */}
              <div className="flex flex-col items-start justify-center gap-1">
                <h2 className="text-[#0C46C4] font-bold text-md md:text-3xl">
                  {item.total}
                </h2>
                <span className="text-[8px] md:text-sm font-bold uppercase text-gray-400 tracking-wider">
                  {item.title}
                </span>
              </div>

              {/* Right side - Icon */}
              <div className="rounded-full md:p-3 bg-blue-50 text-[#0C46C4] flex items-center justify-center text-2xl sm:text-3xl">
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
