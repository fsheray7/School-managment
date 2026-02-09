import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 5000; // 5 seconds
    const intervalTime = 50; // Update every 50ms
    const step = (intervalTime / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    // Redirect after 5 seconds
    const redirectTimeout = setTimeout(() => {
      navigate("/select-profile");
    }, duration);

    return () => {
      clearInterval(timer);
      clearTimeout(redirectTimeout);
    };
  }, [navigate]);

  return (
    <section className="relative w-full h-[100dvh] overflow-hidden bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-90 h-90 sm:w-80 sm:h-80 md:w-[632px] md:h-[632px] lg:w-[632px] lg:h-[632px]
          -left-46 sm:-left-32 md:-left-75 lg:-left-80 
          -top-65 sm:-top-62 md:-top-120 lg:-top-[460px]
          transition-all duration-300"
      ></div>

      {/* Center Logo Image - Responsive */}
      <div className="flex flex-col items-center justify-center z-10 w-full mb-10">
        <img
          src="./welcomepage/logo.png"
          alt="Logo Img"
          className="w-40 h-45 sm:w-50 sm:h-56 md:w-60 md:h-72 lg:w-[240px] lg:h-[280px] 
            object-contain transition-all duration-300 mb-8"
        />

        {/* Loading Bar Container */}
        <div className="w-64 sm:w-80 h-1.5 bg-gray-100 rounded-full overflow-hidden shadow-inner flex items-center">
          <div
            className="h-full transition-all duration-75 ease-linear rounded-full"
            style={{
              width: `${progress}%`,
              backgroundColor: "var(--primary-color)",
              boxShadow: `0 0 10px var(--primary-color)`,
            }}
          ></div>
        </div>
        <p className="mt-4 text-gray-500 font-medium text-sm animate-pulse">
          Loading... {Math.round(progress)}%
        </p>
      </div>

      {/* Powered By Text - Fixed at Bottom Center - Responsive */}
      <p
        className="fixed bottom-2
          left-1/2 -translate-x-1/2
          z-50 text-white font-light 
          text-xs sm:text-sm md:text-base lg:text-base
          text-center transition-all font-bold duration-300
          w-full px-4"
      >
        Powered by: XYZ COM
      </p>

      {/* Decorative Background Circle Bottom - Responsive */}
      <div
        className="absolute rounded-full
          w-100 h-100  sm:w-180 sm:h-180 md:w-210 md:h-210 lg:w-300 lg:h-310
           -bottom-75 sm:-bottom-130 md:-bottom-180 lg:-bottom-285
          transition-top-[520px]
          transition-all duration-300"
        style={{ backgroundColor: "var(--primary-color)" }}
      ></div>
    </section>
  );
};

export default WelcomePage;
