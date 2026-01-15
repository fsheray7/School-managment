import React from "react";
import { Link } from "react-router-dom";


const WelcomePage = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-90 h-90 sm:w-80 sm:h-80 md:w-[632px] md:h-[632px] lg:w-[632px] lg:h-[632px]
          -left-46 sm:-left-32 md:-left-75 lg:-left-80 
          -top-65 sm:-top-62 md:-top-120 lg:-top-[460px]
          transition-all duration-300"
      ></div>

      {/* Center Logo Image - Responsive */}
      <div
        className="flex flex-col items-center justify-center 
           lg:pb-10 
          z-10 w-full"
      >
        <img
          src="./welcomepage/logo.png"
          alt="Logo Img"
          className="w-40 h-45 sm:w-50 sm:h-56 md:w-60 md:h-72 lg:w-[240px] lg:h-[280px] 
            object-contain transition-all duration-300"
        />
      </div>
        <div className="z-10 mt-8 md:mt-8 lg:mt-0 mb-20 w-full   text-center">

       <Link to="/select-profile"
          type="submit"
          className=" text-center   bg-[#0C46C4] hover:bg-blue-800 active:bg-blue-900 text-white px-10 py-3 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-bold w-full"
          >
          Get Started 
        </Link>
          </div>


      {/* Powered By Text - Fixed at Bottom Center - Responsive */}
      <p
        className="fixed bottom-10 sm:bottom-10 md:bottom-18 lg:bottom-14 
          left-1/2 -translate-x-1/2
          z-50 text-white font-light 
          text-xs sm:text-sm md:text-xl lg:text-xl
          text-center transition-all duration-300
          w-full px-4"
      >
        Powered by: XYZ COM
      </p>

      {/* Decorative Background Circle Bottom - Responsive */}
      <div
        className="absolute rounded-full bg-[#0C46C4]
          w-110 h-110 xs:w-120 xs:h-120 sm:w-180 sm:h-180 md:w-230 md:h-230 lg:w-320 lg:h-320
           -bottom-75 sm:-bottom-130 md:-bottom-180 lg:-bottom-285
          transition-top-[520px]
          transition-all duration-300"
      ></div>
    </section>
  );
};

export default WelcomePage;
