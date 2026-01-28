import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import Login from "../components/rolecomp/Login";

const ProfileSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleLoginSuccess = () => {
    if (selectedRole === "teacher") {
      navigate("/teacher-dashboard");
    } else if (selectedRole === "student") {
      navigate("/student-dashboard");
    } else if (selectedRole === "admin") {
      navigate("/admin-dashboard");
    }
  };

  const ROLES = [
    { id: "admin", label: "Admin", icon: FaUser, iconSize: 40 },
    {
      id: "teacher",
      label: "Teacher",
      icon: FaChalkboardTeacher,
      iconSize: 50,
    },
    { id: "student", label: "Student", icon: FaUserGraduate, iconSize: 44 },
  ];

  const boxStyle =
    "flex flex-col p-2 items-center justify-center md:w-24 md:h-24 lg:w-24 lg:h-24 w-10 h-10 bg-[#0C46C4] rounded-xl text-white cursor-pointer hover:bg-blue-800 transition shadow-md";

  return (
    <section className="relative w-full min-h-screen bg-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 md:justify-center overflow-hidden">
      {/* Background Decorative Circle */}
      <div
        className="absolute   rounded-full bg-[#28C2A0]
       w-170 h-170 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-340 lg:h-340 
       -top-120 sm:-top-122 md:-top-280 lg:-top-310 transition-all duration-300"
      />

      {/* Header Logo */}
      <div
        className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center z-10 w-full 
      top-6 sm:top-10 md:top-14 lg:top-4"
      >
        <div className="relative flex items-center justify-center w-full max-w-[160px] md:max-w-[140px]">
          <img
            src="./profileselection/Vector.png"
            alt=""
            className="w-full object-cover"
          />
          <img
            src="./welcomepage/logo.png"
            alt="School Logo"
            className="absolute w-1/2 object-cover"
          />
        </div>
      </div>

      <div className="z-50 w-full max-w-lg mt-24 sm:mt-28 md:mt-0 flex flex-col items-center">
        {!selectedRole ? (
          <div className="flex flex-col items-center gap-8 sm:gap-10">
            <h1 className="text-[#0C46C4] text-xl md:text-3xl font-bold font-opensans text-center">
              Choose your option
            </h1>

            <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-10">
              {ROLES.map(({ id, label, icon: Icon, iconSize }) => (
                <div
                  key={id}
                  className="flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer group"
                  onClick={() => handleRoleSelect(id)}
                >
                  <div className={boxStyle}>
                    <Icon size={iconSize} />
                  </div>
                  <span className="mt-3 text-md font-semibold text-gray-700 group-hover:text-[#0C46C4] transition-colors">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl w-full max-w-[400px] mt-4 sm:mt-8 md:mt-30 p-4">
            <button
              onClick={handleBackToRoles}
              className="group relative text-[#0C46C4] text-sm font-semibold flex items-center hover:scale-105 transition duration-300 cursor-pointer gap-2 mb-4"
            >
              <span>← Back to Selection</span>
              <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#0C46C4] transition-all duration-300 -translate-x-1/2 group-hover:w-full"></span>
            </button>

            <h2 className="text-[#0C46C4] text-lg md:text-lg font-bold font-opensans text-center mb-4 capitalize">
              {selectedRole} Login
            </h2>

            <Login onLoginSuccess={handleLoginSuccess} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSelection;
