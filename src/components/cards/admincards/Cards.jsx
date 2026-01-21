import React from 'react'
import { Link } from "react-router-dom";
import data from '../../../data/admindata/carddata/AdminData';

const Cards = () => {
    return (
        <div className="w-full flex flex-col md:flex-row lg:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 px-2 sm:px-4">
            {data.map((item) => {
                const Icon = item.icon;
                return (
                    <div
                        key={item.id}
                        className="w-full flex flex-row items-center justify-between p-3 sm:p-4 md:p-5 lg:p-6 border-t-4 sm:border-t-6 hover:scale-102 transition-all duration-300 md:border-t-8 border-[#0C46C4] rounded-lg sm:rounded-xl shadow-lg sm:shadow-xl"
                    >
                        {/* Left side - Title and Total */}
                        <div className="flex flex-col items-start justify-center gap-1 sm:gap-2">
                            <h2 className="text-[#0C46C4] font-bold text-lg sm:text-xl md:text-2xl lg:text-2xl">
                                {item.total}
                            </h2>
                            <span className="text-xs sm:text-sm md:text-base lg:text-md font-semibold uppercase text-[#0C46C4]">
                                <Link to="/marks-student">{item.title}</Link>
                            </span>
                        </div>

                        {/* Right side - Icon */}
                        <div className="rounded-full px-2 py-2 sm:px-4 sm:py-4 md:px-5 md:py-5 lg:px-3 lg:py-3 bg-blue-600 text-white flex items-center justify-center text-xl sm:text-2xl md:text-3xl lg:text-3xl">
                            <Icon />
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default Cards;