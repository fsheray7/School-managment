import React from "react";

import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const TeacherDashboard = () => {
  return (
    <section className="w-full    p-4 sm:p-6 flex flex-col gap-6">
      {/* Welcome Card */}
      <div className="w-full bg-[#0C46C4] text-white rounded-xl p-4 sm:p-6 shadow-md">
        <div className="flex justify-start gap-4 items-center">
          <h2 className="text-base sm:text-lg font-semibold">
            Welcome Message
          </h2>
          <span className="text-xl "><FaArrowRight /></span>
        </div>
        <p className="text-xs sm:text-sm mt-2 opacity-90">
          The standard Lorem Ipsum passage "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.”
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-3  sm:grid-cols-3 gap-4 sm:gap-6  ">
        {/* Item */}
        <div className="flex  justify-center flex-col items-center">
          <div className="  bg-[#E8F8F6] rounded-xl p-4 flex justify-center cursor-pointer items-center shadow-sm">
                <img
              src="/teachersection/attendance.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <Link to="/attendance" className="mt-2 text-xs sm:text-sm  font-medium">
            Attendance
          </Link>
        </div>

        <div className="flex flex-col items-center">
          <div className="cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
             <img
              src="/teachersection/homework.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium">Homework</span>
        </div>

        <div className="flex flex-col items-center">
          <div className="cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
             <img
              src="/teachersection/results.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium">Result</span>
        </div>

        <div className="flex flex-col items-center">
          <div className=" cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
             <img
              src="/teachersection/exam.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium">
            Exam Routine
          </span>
        </div>

        <div className="flex flex-col items-center">
          <div className=" cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
            <img
              src="/teachersection/solution.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium">Solution</span>
        </div>
        <div className="flex flex-col items-center">
          <div className=" cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
            <img
              src="/teachersection/events.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </div>
          <span className="mt-2 text-xs sm:text-sm font-medium">Notes & Events</span>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/add-account" className=" cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
             <img
              src="/teachersection/user.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
              </Link>
          <p  className="mt-2 text-xs sm:text-sm font-medium">
            Add Account
          </p>
        </div>

        <div className="flex flex-col items-center">
          <Link to="/add-classes"   className="  cursor-pointer  bg-[#E8F8F6] rounded-xl p-4 flex justify-center items-center shadow-sm">
            <img
              src="/teachersection/homework.png"
              alt="Logo Img"
              className="text-[#0C46C4] text-3xl sm:text-4xl" />
          </Link>
          <span className="mt-2 text-xs sm:text-sm font-medium">
            Add Classes
          </span>
        </div>
        
      </div>
    </section>
  );
};

export default TeacherDashboard;
