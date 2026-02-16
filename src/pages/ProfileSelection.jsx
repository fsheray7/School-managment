import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaChalkboardTeacher, FaUser } from "react-icons/fa";
import { FaUserGraduate } from "react-icons/fa6";
import Login from "../components/login/Login";
import Button from "../components/ui/Button";

const ProfileSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleLoginSuccess = (userData) => {
    if (selectedRole === "teacher") {
      if (userData) {
        localStorage.setItem("currentTeacher", JSON.stringify(userData));
      }
      navigate("/teacher-dashboard");
    } else if (selectedRole === "student") {
      if (userData) {
        localStorage.setItem("currentStudent", JSON.stringify(userData));
      }
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
    "flex flex-col p-2 items-center justify-center md:w-16 md:h-16 lg:w-16 lg:h-16 w-10 h-10 rounded-xl text-white cursor-pointer hover:brightness-90 transition shadow-md";

  return (
    <section className="relative w-full  bg-white flex flex-col items-center px-4 sm:px-6 md:px-8 py-8 md:justify-center overflow-hidden">
      {/* Background Decorative Circle */}
      <div
        className="absolute   rounded-full bg-[#28C2A0]
       w-170 h-170 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-340 lg:h-340 
       -top-140 sm:-top-122 md:-top-300 lg:-top-310 transition-all duration-300"
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
            className="absolute w-2/3 object-cover"
          />
        </div>
      </div>

      <div className="z-50 w-full max-w-lg mt-40 sm:mt-28 md:mt-45 lg:mt-40 flex flex-col items-center">
        {!selectedRole ? (
          <div className="flex flex-col items-center gap-6">
            <h1
              className="text-lg md:text-2xl font-bold text-center"
              style={{ color: "var(--text-primary-color)" }}
            >
              Choose your option
            </h1>

            <div className="flex flex-wrap justify-center items-end gap-6 sm:gap-10">
              {ROLES.map(({ id, label, icon: Icon, iconSize }) => (
                <div
                  key={id}
                  className="flex flex-col items-center hover:scale-105 transition duration-300 cursor-pointer group"
                  onClick={() => handleRoleSelect(id)}
                >
                  <div
                    className={boxStyle}
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <Icon size={iconSize} />
                  </div>
                  <span
                    className="mt-3 text-md font-semibold text-gray-700 transition-colors"
                    style={{ color: "var(--text-primary-color)" }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-2xl w-full max-w-[400px] mt-2 sm:mt-8 md:mt-4">
            <Button
              onClick={handleBackToRoles}
              variant="ghost"
              className="py-1 text-xs "
            >
              ← Back to Selection
             
            </Button>

            <h2
              className="text-lg md:text-lg font-bold text-center mb-4 capitalize"
              style={{ color: "var(--primary-color)" }}
            >
              {selectedRole} Login
            </h2>

            <Login onLoginSuccess={handleLoginSuccess} role={selectedRole} />
          </div>
        )}
      </div>
    </section>
  );
};

export default ProfileSelection;
