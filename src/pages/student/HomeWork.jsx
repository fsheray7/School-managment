import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeWorkStudent = () => {
  return (
    <section className="w-full  py-10 flex flex-col   items-center justify-center ">
      <form
        action=""
        className="w-full flex flex-col  items-center justify-center px-8 mt-30 md:mt-30 gap-6 max-w-7xl"
      >
        <div className=" px-10 flex flex-col items-center justify-center gap-4 text-center">
          <h1
            className=" text-2xl font-semibold"
            style={{ color: "var(--primary-color)" }}
          >
            Math_2078/homework file name/
          </h1>
        </div>

        <div className="flex w-full max-w-2xl space-y-2  flex-col">
          <input
            type="text"
            className="w-full outline-none border border-gray-300 h-40 py-2 bg-gray-50 rounded"
          />
        </div>

        <button
          onClick={() => navigate("/quizoptions")}
          className="flex items-center justify-center text-xl mt-20 w-full max-w-md text-white px-6 py-2 rounded-lg mt-6 hover:brightness-90 transition-all active:scale-95 shadow-md"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Download your Homework
        </button>
      </form>
    </section>
  );
};

export default HomeWorkStudent;
