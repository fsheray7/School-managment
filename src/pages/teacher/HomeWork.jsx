import React from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeWork = () => {
  return (
    <section className="w-full   mt-20  flex flex-col   items-center justify-center gap-10">
      <form
        action=""
        className="w-full flex flex-col  items-center justify-center px-8  gap-6 "
      >
        <div className=" px-10 flex flex-col items-center justify-center gap-4 text-center">
          <h1
            className=" text-2xl font-semibold"
            style={{ color: "var(--primary-color)" }}
          >
            Subject
          </h1>
        </div>

        <div className="flex w-full max-w-2xl space-y-2  flex-col">
          <label className="text-xl">Add Homework</label>
          <input className="w-full outline-none border border-gray-300 py-2 rounded transition-all focus:ring-2 focus:ring-[var(--primary-color)]/20 shadow-sm" />
        </div>

        <button
          className=" mt-6 w-full text-white max-w-lg py-3 rounded-md hover:brightness-90 transition-all active:scale-95 shadow-md"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Submit
        </button>
      </form>

      <p className="mt-4 font-medium" style={{ color: "var(--primary-color)" }}>
        File is uploaded sucessfully
      </p>
    </section>
  );
};

export default HomeWork;
