import React from "react";
import StudentDashboard from "../../pages/studentpages/StudentDashboard";

const StudentLayout = () => {
  
  return (
    <section className="relative w-full overflow-hidden pb-10   bg-none flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-400 lg:h-400  
         
          -top-120 sm:-top-122 md:-top-290 lg:-top-370 
          transition-all duration-300 "
      ></div>

      {/* Center Logo Image - Responsive - Moved to Top */}
       <div
        className="absolute top-15 sm:top-12 md:top-24 lg:top-12
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-22 h-22 sm:w-90 sm:h-92 md:w-95 md:w-40 md:h-40 lg:w-30 lg:h-30 
            object-contain transition-all duration-300"
        />
        <img
          src="/teachersection/happyemoji.png"
          alt="Logo Img"
          className=" absolute w-20 h-20 sm:w-30 sm:h-30 md:w-30 md:h-30 lg:w-30 lg:h-30 
            object-contain transition-all duration-300"
        />
      </div>

      {/* Dynamic Content Area */}
     <div className="flex w-full items-center flex-col justify-center z-50 mt-25">

            <div className="bg-white rounded-lg   flex justify-center items-center w-full max-w-6xl  mt-20 sm:mt-6 md:mt-40 lg:mt-20">   
    <StudentDashboard />
            </div>
      
</div>

     
    </section>
  );
};

export default StudentLayout;
