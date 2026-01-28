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

  const boxStyle =
    "flex flex-col p-2 items-center justify-center md:w-24 md:h-24 lg:w-24 lg:h-24 w-10 h-10 bg-[#0C46C4] rounded-xl text-white cursor-pointer hover:bg-blue-800 transition";

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-white flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="flex w-full items-center flex-col justify-center z-50">
        {!selectedRole ? (
          <div className="flex flex-col mt-10 justify-center items-center gap-6 sm:gap-8 md:gap-10">
            <h1 className="text-[#0C46C4] text-md sm:text-xl md:text-2xl lg:text-3xl font-bold font-opensans text-center">
              Choose your option
            </h1>

            <div className="flex flex-row justify-center items-center gap-6 sm:gap-8 md:gap-10 flex-wrap">
              {/* Admin Button */}
              <div
                className="flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => handleRoleSelect("admin")}
              >
                <div className={boxStyle}>
                  <FaUser size={40} />
                </div>
                <span className="mt-2 text-md font-semibold text-gray-700">
                  Admin
                </span>
              </div>

              {/* Teacher Button */}
              <div
                className="flex flex-col hover:scale-105 transition duration-300 items-center cursor-pointer"
                onClick={() => handleRoleSelect("teacher")}
              >
                <div className={boxStyle}>
                  <FaChalkboardTeacher size={50} />
                </div>
                <span className="mt-2 text-md font-semibold text-gray-700">
                  Teacher
                </span>
              </div>

              {/* Student Button */}
              <div
                className="flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer"
                onClick={() => handleRoleSelect("student")}
              >
                <div className={boxStyle}>
                  <FaUserGraduate size={44} />
                </div>
                <span className="mt-2 text-md font-semibold text-gray-700">
                  Student
                </span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-[400px] p-6 lg:p-8">
              <button
                onClick={handleBackToRoles}
                className="text-[#0C46C4] text-sm font-opensans hover:underline mb-6 flex items-center gap-2"
              >
                ← Back to Role Selection
              </button>

              <h2 className="text-[#0C46C4] text-xl md:text-2xl font-bold font-opensans text-center mb-8 capitalize">
                {selectedRole} Login
              </h2>

              <Login onLoginSuccess={handleLoginSuccess} />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSelection;
