import React from "react";
import StudentDashboard from "../../pages/studentpages/StudentDashboard";

const StudentProfile = () => {
  
  return (
    <section className="relative w-full overflow-hidden  lg:h-full bg-none flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
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
          src="/studentimage/student1.png"
          alt="Logo Img"
          className=" rounded-full
          object-cover absolute w-20 h-20 sm:w-30 sm:h-30 md:w-30 md:h-30 lg:w-27 lg:h-27 
            object-contain transition-all duration-300"
        />
      </div>

      {/* Dynamic Content Area */}
     <div className="flex w-full items-start max-w-4xl flex-col justify-center text-[#0C46C4] px-2 md:px-10 lg:px-20 mt-40 md:mt-50 lg:mt-30 z-50 gap-6">

          <h1 className="text-[#0C46C4] font-bold">ID: 165653</h1>

          <div className="flex flex-col gap-2 ">

          <p className="flex flex-col font-semibold">Full Name: <span className="  text-[#000000]">Prajesh Shakya</span></p>
          <p className="flex flex-col font-semibold">Grade: <span className="text-[#000000]">9 'B'</span></p>
          <p className="flex flex-col font-semibold">Roll No: <span className="text-[#000000]">21</span></p>
          <p className="flex flex-col font-semibold">Address: <span className="text-[#000000]">Prajesh Shakya</span></p>
          <p className="flex flex-col font-semibold">Guardian's Name: <span className="text-[#000000]">Prajesh Shakya</span></p>

          <p className="flex flex-col font-semibold">Guardian's Contact: <span className="text-[#000000]">0987654321</span></p>
         
          </div>
         
      
</div>

 <button className="text-xl mt-10 w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg cursor-pointer ">Request Edit</button>


     
    </section>
  );
};

export default StudentProfile;
