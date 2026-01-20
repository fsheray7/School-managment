import React from "react";

const RoleSelection = ({ onRoleSelect }) => {
  const boxStyle =
    "flex flex-col p-2 items-center justify-center md:w-28 md:h-28 lg:w-28 lg:h-28 w-10 h-10 bg-blue-700 rounded-xl text-white cursor-pointer hover:bg-blue-800 transition";

  return (
    <div className="flex flex-col justify-center  items-center gap-6 sm:gap-8 md:gap-10 ">
      {/* Heading - Always on Top */}
      <h1 className="text-[#0C46C4] text-md sm:text-xl md:text-2xl lg:text-3xl font-bold font-opensans text-center">
        Choose your option
      </h1>

      {/* Buttons Container - Responsive */}
      <div className="flex flex-row md:flex-row lg:flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 flex-wrap">
        {/* Student Button */}
        <div
          className="flex flex-col justify-center items-center cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("student")}
        >
          <div className={boxStyle}>
            <img src="/profileselection/Studentmale.png" alt="student png" />
          </div>
          <span className="font-opensans text-[#000000] mt-2 text-sm sm:text-md">Student</span>
        </div>

        {/* Teacher Button */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("teacher")}
        >
          <div className={boxStyle}>
            <img src="/profileselection/Tuition.png" alt="Tution png" />
          </div>
          <span className="mt-2 text-sm sm:text-md">Teacher</span>
        </div>

        {/* Guest Button */}
        <div
          className="flex flex-col items-center cursor-pointer"
          onClick={() => onRoleSelect && onRoleSelect("guest")}
        >
          <div className={boxStyle}>
            <img src="/profileselection/Person.png" alt="user png" />
          </div>
          <span className="mt-2 text-sm sm:text-md">Guest</span>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
