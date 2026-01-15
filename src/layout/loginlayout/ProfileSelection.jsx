import React, { useState } from "react";
import RoleSelection from "../../components/roleCompnent/RoleSelection";
import Login from "../../components/roleCompnent/Login";

const ProfileSelection = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    // Future: Here you can route to login/signup forms based on role
    console.log(`Selected role: ${role}`);
  };

  const handleBackToRoles = () => {
    setSelectedRole(null);
  };

  return (
    <section className="relative w-full overflow-hidden bg-none flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}
      <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-450 lg:h-450  
         
          -top-100 sm:-top-122 md:-top-260 lg:-top-410 
          transition-all duration-300 "
      ></div>

      {/* Center Logo Image - Responsive - Moved to Top */}
      <div
        className="absolute top-14 sm:top-12 md:top-20 lg:top-12
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-50 h-50 sm:w-90 sm:h-92 md:w-95 md:w-80 md:h-80 lg:w-50 lg:h-50 
            object-contain transition-all duration-300"
        />
        <img
          src="./welcomepage/logo.png"
          alt="Logo Img"
          className=" absolute w-30 h-30 sm:w-50 sm:h-50 md:w-60 md:h-60 lg:w-40 lg:h-40 
            object-contain transition-all duration-300"
        />
      </div>

      {/* Dynamic Content Area */}
     <div className="flex w-full items-center flex-col justify-center z-50 mt-70">
  {!selectedRole ? (
    <RoleSelection onRoleSelect={handleRoleSelect} />
  ) : (
    <div className="flex w-full justify-center">
      {/* Card Container */}
      <div className="bg-white rounded-lg md:shadow-lg p-8 w-full max-w-2xl mt-6 sm:mt-6 md:mt-30 lg:mt-10">
        <button
          onClick={handleBackToRoles}
          className="text-[#0C46C4] text-sm font-opensans hover:underline mb-4"
        >
          ← Back to Role Selection
        </button>

        <h2 className="text-[#0C46C4] text-2xl font-bold font-opensans text-center mb-6">
          {selectedRole === "student" }
          {selectedRole === "teacher" }
          {selectedRole === "guest" }
        </h2>

        {/* FORM FULL WIDTH */}
        <div className="w-full">
          <Login />
        </div>
      </div>
    </div>
  )}
</div>


     
    </section>
  );
};

export default ProfileSelection;
