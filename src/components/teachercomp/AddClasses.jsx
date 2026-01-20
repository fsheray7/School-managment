import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddClasses = () => {
  return (
    <section className="relative flex flex-col items-center justify-between min-h-screen w-full bg-white overflow-hidden px-4 pb-10">

    {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/homeworkwhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Add Classes
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/teacher-dashboard"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>

     
      {/* Form */}
      <form className="w-full max-w-2xl mt-36 md:mt-45 flex flex-col gap-4">

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Class</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4]  placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
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
