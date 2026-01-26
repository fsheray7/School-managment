import { useState, useRef, useEffect } from "react";
import { FaArrowLeft, FaPlus } from "react-icons/fa";


import { useNavigate } from "react-router-dom";

const Questions = () => {
  const [showOptions, setShowOptions] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showOptions]);

  const navigate = useNavigate();

  return (
    <section className="w-full bg-white flex flex-col items-center">




      <div className="w-full mt-32 flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 px-4">

        <div className="w-full flex flex-col items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-xl gap-8">
          <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">Question</h2>
          <p className="w-full px-4   ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</p>

          <span className="w-full text-xl font-semibold  uppercase text-[#0C46C4]  flex items-center justify-end gap-2 hover:text-[#0a369e]">

            <button className="cursor-pointer" onClick={() => navigate("/answer")}>View</button>
          </span>

        </div>

        <div className="w-full flex flex-col items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-lg gap-8">
          <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">Question</h2>
          <p className="w-full px-4   ">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua?</p>

          <span className="w-full text-xl font-semibold  uppercase  text-[#0C46C4]   flex items-center justify-end gap-2 hover:text-[#0a369e]">

            <button className="cursor-pointer" onClick={() => navigate("/answer")}>View</button>
          </span>

        </div>


      </div>

      {/* Floating Button */}


      <div ref={menuRef} className="flex bottom-4 fixed right-4 flex-col items-center gap-4 mt-6">
        {/* Options */}
        {showOptions && (
          <>
            <button
              className="px-4 fixed bottom-35 right-10 sm:px-5 py-1 sm:py-1 bg-[#FFFFFF] border border-[#28C2A0] text-[#00000080] cursor-pointer rounded-full text-xs sm:text-sm font-medium hover:bg-[#28C2A015] transition"
            >
              Remove Question
            </button>

            <button onClick={() => navigate("/ask-question")}
              className="px-4 fixed bottom-20 right-10 sm:px-5 py-1 sm:py-1 border border-[#28C2A0] text-[#00000080] rounded-full text-xs sm:text-sm font-medium hover:bg-[#28C2A015] cursor-pointer transition"
            >
              Add Question
            </button>
          </>
        )}

        {/* Floating Fab */}
        <button
          onClick={() => setShowOptions(!showOptions)}
          className="w-12 h-12 sm:w-14 sm:h-14 bg-[#5C52D4] rounded-full flex items-center justify-center shadow-md hover:bg-[#483fc2] cursor-pointer hover:scale-110 transition"
        >
          <FaPlus className="text-white text-lg sm:text-xl" />
        </button>
      </div>
    </section>
  );
};

export default Questions;
