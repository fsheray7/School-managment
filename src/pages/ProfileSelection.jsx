import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import RoleSelection from "../components/roleCompnent/RoleSelection";
import Login from "../components/roleCompnent/Login";

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
    // Navigate based on selected role
    if (selectedRole === "teacher") {
      navigate("/teacher-dashboard");
    } else if (selectedRole === "student") {
      navigate("/student-dashboard");
      console.log("Student dashboard coming soon");
    } else if (selectedRole === "admin") {
      // navigate("/guest-dashboard");
      console.log("Admin dashboard coming soon");
    }
  };

  return (
    <section className="relative  w-full overflow-hidden bg-none flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      {/* Decorative Background Circle Top - Responsive */}

      {/* Dynamic Content Area */}
      <div className=" flex w-full items-center flex-col justify-center z-50 mt-0">
        {!selectedRole ? (
          <RoleSelection onRoleSelect={handleRoleSelect} />
        ) : (
          <div className="flex w-full justify-center ">
            {/* Card Container */}
            <div className="bg-white rounded-lg md:shadow-lg w-full max-w-xl">
              <button
                onClick={handleBackToRoles}
                className="text-[#0C46C4] text-sm font-opensans hover:underline"
              >
                ← Back to Role Selection
              </button>

              <h2 className="text-[#0C46C4] text-2xl font-bold font-opensans text-center mb-6">
                {selectedRole === "student"}
                {selectedRole === "teacher"}
                {selectedRole === "admin"}
              </h2>

              {/* FORM FULL WIDTH */}
              <div className="w-full  flex ">
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
