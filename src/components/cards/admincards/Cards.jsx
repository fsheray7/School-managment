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
              className="flex flex-row items-center justify-between p-2 md:py-2 md:px-6 w-full border-t-[6px] rounded-xl shadow-sm bg-white hover:scale-105 hover:shadow-md transition-all duration-300 cursor-default"
              style={{ borderTopColor: "var(--primary-color)" }}
            >
              {/* Left side - Title and Total */}
              <div className="flex flex-col items-start justify-center gap-1">
                <h2
                  className="font-bold text-md md:text-xl"
                  style={{ color: "var(--primary-color)" }}
                >
                  {item.total}
                </h2>
                <span className="text-[8px] md:text-sm font-bold uppercase text-gray-400 tracking-wider">
                  {item.title}
                </span>
              </div>

              {/* Right side - Icon */}
              <div
                className="rounded-full md:p-3 bg-blue-50 flex items-center justify-center text-xl sm:text-xl"
                style={{ color: "var(--primary-color)" }}
              >
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
