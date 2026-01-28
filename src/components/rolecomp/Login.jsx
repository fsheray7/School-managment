import { useState } from "react";
import { FaUser } from "react-icons/fa";
import { IoEye, IoEyeOff } from "react-icons/io5";

const Login = ({ onLoginSuccess }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would validate credentials
    // For now, just call the success callback
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <form
        className="w-full max-w-md flex flex-col gap-4 sm:gap-5 md:gap-6 px-4"
        onSubmit={handleSubmit}
      >
        {/* Username */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <label className="text-xs sm:text-sm md:text-base font-semibold text-black">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Enter username/email"
              className="w-full pb-2 md:pb-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 text-xs sm:text-sm md:text-base text-gray-600 placeholder-gray-400"
            />
            <FaUser className="text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 text-xs sm:text-sm md:text-base" />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <label className="text-xs sm:text-sm md:text-base font-semibold text-black">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="***************"
              className="w-full pb-2 md:pb-3 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 text-xs sm:text-sm md:text-base text-gray-600 tracking-widest placeholder-gray-400"
            />
            {showPassword ? (
              <IoEye
                className="text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-xs sm:text-sm md:text-base"
                onClick={togglePasswordVisibility}
              />
            ) : (
              <IoEyeOff
                className="text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-xs sm:text-sm md:text-base"
                onClick={togglePasswordVisibility}
              />
            )}
          </div>
        </div>

        {/* Login Button */}
        <div className="flex justify-center w-full mt-4">
          <button
            type="submit"
            className="flex items-center justify-center bg-[#0C46C4] hover:bg-blue-800 active:bg-blue-900 text-white py-2.5 md:py-3 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-base font-bold w-full max-w-[280px] shadow-md transition-all active:scale-95"
          >
            Login
          </button>
        </div>

        {/* Forgot Password */}
        <a
          href="#"
          className="text-center text-gray-500 hover:text-blue-600 text-xs sm:text-sm md:text-base mt-2 transition-colors"
        >
          Forgot Password ?
        </a>
      </form>
    </>
  );
};

export default Login;
