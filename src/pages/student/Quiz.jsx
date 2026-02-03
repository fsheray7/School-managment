import React from "react";

import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full  bg-white flex flex-col items-center justify-center px-4 overflow-x-hidden mt-10">
      {/* NAV BAR */}
      {/* <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/eventswhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Quiz
          </h1>
        </div>

        <div className="flex items-center">
          <button onClick={() => navigate("/student-dashboard")}
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </button>
        </div>
      </nav> */}

      <div className="flex pt-6 items-center justify-center">
        <img
          src="/studentimage/quizimage.png"
          alt="Quiz image"
          className="w-60 h-60"
        />
      </div>

      <button
        onClick={() => navigate("/quizoptions")}
        className="flex items-center justify-center text-xl mt-20 text-white px-30 py-2 rounded-lg mt-6 hover:brightness-90 transition-all active:scale-95 shadow-md"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        Start
      </button>
    </section>
  );
};

export default Quiz;
