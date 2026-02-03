import { FaArrowLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const AddClasses = () => {
  return (
    <section className="relative flex flex-col items-start justify-between w-full bg-white overflow-hidden px-8">
      {/* Form */}
      <form className="w-full max-w-xl mt-26 flex flex-col i gap-4">
        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">Class</label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-gray-300 placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none transition-all focus:ring-1 focus:ring-[var(--primary-color)]/20 shadow-sm"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-gray-300 placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-md font-semibold text-[#000000]">
            Section
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-gray-300 placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        {/* Submit */}
        <button
          className="mt-4 w-full max-w-md text-white font-semibold rounded-md py-3 text-sm hover:brightness-90 transition-all active:scale-95 shadow-md"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Add Class
        </button>
      </form>
    </section>
  );
};

export default AddClasses;
