import { FaUser } from "react-icons/fa";
import { IoEyeOff } from "react-icons/io5";
import { Link } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would validate credentials
    // For now, just call the success callback
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };
  return (
    <>
      <form className="w-full flex flex-col gap-4 sm:gap-5 md:gap-6 px-4 sm:px-6 md:px-8" onSubmit={handleSubmit}>
        
        {/* Username */}
        <div className="flex flex-col gap-2 sm:gap-2.5">
          <label className="text-xs sm:text-sm md:text-base font-semibold text-black">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="PRAJESH SHAKYA"
              className="w-full pb-2 sm:pb-3 md:pb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 text-xs sm:text-sm md:text-base text-gray-600 placeholder-gray-400"
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
              type="password"
              placeholder="***************"
              className="w-full pb-2 sm:pb-3 md:pb-4 border-b-2 border-gray-300 focus:outline-none focus:border-blue-600 text-xs sm:text-sm md:text-base text-gray-600 tracking-widest placeholder-gray-400"
            />
            <IoEyeOff className="text-blue-600 absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-xs sm:text-sm md:text-base" />
          </div>
        </div>

        {/* Login Button */}
        <Link to="/teacher-dashboard"
          type="submit"
          className="mt-4 text-center sm:mt-6 md:mt-8 bg-[#0C46C4] hover:bg-blue-800 active:bg-blue-900 text-white py-2.5 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl text-xs sm:text-sm md:text-base font-bold w-full"
        >
          Login
        </Link>

        {/* Forgot Password */}
        <a
          href=""
          className="text-center text-gray-500 hover:text-blue-600 text-xs sm:text-sm md:text-base mt-2"
        >
          Forgot Password ?
        </a>
      </form>
    </>
  );
};

export default Login;
