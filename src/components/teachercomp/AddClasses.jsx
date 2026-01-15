import { FaPlus } from "react-icons/fa";
import { LuPlus } from "react-icons/lu";

const AddClasses = () => {
  return (
    <section className="relative flex flex-col items-center min-h-screen w-full bg-white overflow-hidden px-4 pt-32 pb-10">

      {/* Top Half Circle */}
       <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-450 lg:h-450  
         
          -top-110 sm:-top-122 md:-top-280 lg:-top-410 
          transition-all duration-300 "
      ></div>


      {/* Add Photo */}
       {/* Center Logo Image - Responsive - Moved to Top */}
      <div
        className="absolute top-20 sm:top-12 md:top-30 lg:top-12
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-30 h-30 sm:w-90 sm:h-92 md:w-95 md:w-40 md:h-40 lg:w-50 lg:h-50 
            object-contain transition-all duration-300"
        />
       <LuPlus className="  absolute text-gray-400 text-6xl sm:text-4xl lg:text-5xl" />

        <p className=" absolute top-23 md:top-30 lg:top-38   text-xs sm:text-sm md:text-base lg:text-lg text-[#28C2A0] font-medium">Add Photo</p>
      </div>
     
      {/* Form */}
      <form className="w-full max-w-2xl mt-36 md:mt-45 flex flex-col gap-4">

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Subject</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4]  placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
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
          <label className="text-md font-semibold text-[#000000]">Class</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

       

        {/* Submit */}
        <button
          className="mt-4 bg-[#0C46C4] hover:bg-[#08308d] text-white font-semibold rounded-md py-3 text-sm"
        >
          Add Class
        </button>
      </form>
    </section>
  );
};

export default AddClasses;
