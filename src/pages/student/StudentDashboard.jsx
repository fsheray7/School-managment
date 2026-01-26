import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  return (
    <section className="flex flex-col items-center justify-start w-full bg-white pt-20 gap-6">
      {/* Welcome Card */}
      <div className="w-full bg-[#0C46C4] text-white rounded-xl  p-2 sm:p-6 ">
        <div className="flex justify-start gap-4 items-center">
          <h2 className="text-sm px-2 sm:text-lg font-semibold">
            Welcome Message
          </h2>
          <span className="text-xl ">
            <FaArrowRight />
          </span>
        </div>
        <p className="text-[10px] px-2 sm:text-sm mt-2 opacity-90">
          The standard Lorem Ipsum passage "Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua.”
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-3 gap-3 sm:gap-5 w-full justify-items-center   mt-6">
        {/* Item */}
        <div className="flex flex-col items-center w-full sm:max-w-none">
          <Link
            to="/attendance-student"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/attendance.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">
            Attendance
          </span>
        </div>

        <div className="flex flex-col items-center w-full max-w-[120px] sm:max-w-none">
          <Link
            to="/homework-student"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/homework.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">
            Homework
          </span>
        </div>

        <div className="flex flex-col items-center w-full max-w-[120px] sm:max-w-none">
          <Link
            to="/results-student"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/results.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">
            Result
          </span>
        </div>

        <div className="flex flex-col items-center w-full max-w-[120px] sm:max-w-none">
          <Link
            to="/exam-routine-student"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/exam.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">
            Exam Routine
          </span>
        </div>

        <div className="flex flex-col items-center w-full max-w-[120px] sm:max-w-none">
          <Link
            to="/questions"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/solution.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">
            Solution
          </span>
        </div>

        <div className="flex flex-col items-center w-full max-w-[120px] sm:max-w-none">
          <Link
            to="/quiz"
            className="w-full bg-[#E8F8F6] rounded-xl p-3 sm:p-4 flex justify-center items-center shadow-sm cursor-pointer"
          >
            <img
              src="/teachersection/events.png"
              alt="Logo Img"
              className="w-8 sm:w-12"
            />
          </Link>
          <span className="mt-2 text-[10px] sm:text-sm font-medium">Quiz</span>
        </div>
      </div>
    </section>
  );
};

export default StudentDashboard;
