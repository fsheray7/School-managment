import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelection from "../../components/roleCompnent/RoleSelection";
import Login from "../../components/roleCompnent/Login";

const ProfileSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    console.log(`Selected role: ${role}`);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  const handleLoginSuccess = () => {
    // Route based on selected role
    if (selectedRole === "teacher") {
      navigate("/teacher-dashboard");
    } else if (selectedRole === "student") {
      navigate("/student-dashboard");
    } else if (selectedRole === "admin") {
      navigate("/admin-dashboard")
      

    }
  };

  return (
    <section className="relative w-full overflow-hidden    bg-none flex flex-col  items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-420 lg:h-440  
         
          -top-120 sm:-top-122 md:-top-260 lg:-top-410 
          transition-all duration-300 "
      ></div>

      {/* Center Logo Image - Responsive - Moved to Top */}
      <div
        className="absolute top-12 sm:top-12 md:top-20 lg:top-8
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-25 h-25 sm:w-90 sm:h-92 md:w-95 md:w-80 md:h-80 lg:w-40 lg:h-40 
            object-contain transition-all duration-300"
        />
        <img
          src="./welcomepage/logo.png"
          alt="Logo Img"
          className=" absolute w-20 h-20 sm:w-50 sm:h-50 md:w-60 md:h-60 lg:w-30 lg:h-30 
            object-contain transition-all duration-300"
        />
      </div>

      {/* Dynamic Content Area */}
      <div className="flex w-full items-center flex-col justify-center max-w-lg  z-50 mt-50   md:mt-110 lg:mt-50 ">
        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : (
          <div className="flex w-full  justify-center">
            {/* Card Container */}
            <div className="bg-white rounded-xl py-2 px-6 w-full  ">
              <button
                onClick={handleBackToRoles}
                className="text-[#0C46C4] text-sm font-opensans hover:underline py-2"
              >
                ← Back to Role Selection
              </button>

              <h2 className="text-[#0C46C4] text-2xl font-bold font-opensans text-center ">
                {selectedRole === "student"}
                {selectedRole === "teacher"}
                {selectedRole === "Admin"}
              </h2>

              {/* FORM FULL WIDTH */}
              <div className="w-full">
                <Login onLoginSuccess={handleLoginSuccess} />
              </div>
            </div>
          </div>
        )}
      </div>



    </section>
  );
};

export default ProfileSelection;
