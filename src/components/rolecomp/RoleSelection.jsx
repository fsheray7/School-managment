import React from "react";
import { FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";

const RoleSelection = ({ onRoleSelect }) => {
  const boxStyle =
    "flex flex-col p-2 items-center justify-center md:w-28 md:h-28 lg:w-25 lg:h-22 w-10 h-10 bg-blue-700 rounded-xl text-white cursor-pointer hover:bg-blue-800 transition";

  return (
    <div className="flex flex-col mt-10 justify-center  items-center gap-6 sm:gap-8 md:gap-10 ">
      {/* Heading - Always on Top */}
      <h1 className="text-[#0C46C4] text-md sm:text-xl md:text-2xl lg:text-3xl font-bold font-opensans text-center">
        Choose your option
      </h1>

      {/* Buttons Container - Responsive */}
      <div className="flex flex-row md:flex-row lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 flex-wrap">
        {/* Admin Button */}
        <div
          className="flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("admin")}
        >
          <div className={boxStyle}>
            {/* <img src="/profileselection/Person.png" alt="user png" /> */}
            <FaUser size={44} />
          </div>
          <span className="mt-2 text-md font-semibold sm:text-md">Admin</span>
        </div>

        {/* Teacher Button */}
        <div
          className="flex flex-col hover:scale-105 transition duration-300 items-center cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("teacher")}
        >
          <div className={boxStyle}>
            {/* <img src="/profileselection/Tuition.png" alt="Tution png" /> */}
            <FaChalkboardTeacher size={74} />
          </div>
          <span className="mt-2 text-md font-semibold sm:text-md">Teacher</span>
        </div>

        {/* Student Button */}
        <div
          className="flex flex-col justify-center items-center hover:scale-105 transition duration-300 cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("student")}
        >
          <div className={boxStyle}>
            {/* <img src="/profileselection/Studentmale.png" alt="student png" /> */}
            <FaUserGraduate size={64} />
          </div>
          <span className="font-opensans text-[#000000] mt-2 text-md font-semibold sm:text-md">Student</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
