import React from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";

const AddTeacher = () => {
  const navigate = useNavigate();
  return (
    <section className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden px-4  pt-20">

      {/* Top Half Circle */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-400 lg:h-405   
         
          -top-110 sm:-top-122 md:-top-280 lg:-top-370 
          transition-all duration-300 "
      ></div>


      {/* Add Photo */}
      {/* Center Logo Image - Responsive - Moved to Top */}
      <div
        className="absolute top-20 sm:top-12 md:top-30 lg:top-16
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-30 h-30 sm:w-90 sm:h-92 md:w-95 md:w-40 md:h-40 lg:w-30 lg:h-30 
            object-contain transition-all duration-300"
        />
        <LuPlus className="  absolute text-gray-400 text-6xl sm:text-4xl lg:text-5xl" />

        <p className=" absolute top-23 md:top-30 lg:top-20   text-xs sm:text-sm md:text-base lg:text-sm text-[#28C2A0] font-medium">Add Photo</p>
      </div>

      {/* Form */}
      <form className="w-full max-w-2xl mt-36 md:mt-30 grid grid-cols-2 flex-col cols-2 gap-4">

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Full Name</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4]  placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Email</label>
          <input
            type="email"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Subject</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Section</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Contact</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Type</label>

          <div className="flex bg-white py-2 gap-3">
            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                className="w-5 h-5 border border-[#0C46C4] rounded cursor-pointer"
              />
              <p className="text-sm">Regular</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="radio"
                name="type"
                className="w-5 h-5 border border-[#0C46C4] rounded cursor-pointer"
              />
              <p className="text-sm">Contractual</p>
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          className="mt-4  bg-[#0C46C4] hover:bg-[#08308d] text-white font-semibold rounded-md py-3 text-sm"
        >
          Add Teacher
        </button>
        <button onClick={() => navigate('/teachers')}
          className="mt-4  text-center bg-[#0C46C4] hover:bg-[#08308d] text-white font-semibold rounded-md py-3 text-md"
        >
          Go Back
        </button>
      </form>
    </section>
  );
};

export default AddTeacher;
