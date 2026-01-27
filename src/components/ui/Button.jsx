import React from "react";

const Button = ({
  variant = "primary",
  onClick,
  type = "button",
  icon,
  children,
  className = "",
}) => {
  const base =
    "flex justify-center items-center gap-2 font-semibold transition-all duration-300";

  const variants = {
    primary:
      "bg-[#0C46C4] hover:bg-[#08308d] cursor-pointer hover:scale-105 transition-all duration-300 text-white rounded-md px-6 py-2 text-sm ",

    ghost:
      "text-blue-500 hover:text-blue-700 cursor-pointer p-2 rounded-full hover:scale-110 transition-all duration-300 hover:bg-blue-50",

    danger:
      "bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-2 cursor-pointer hover:scale-105 transition-all duration-300 ",

    success:
      "bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2 cursor-pointer hover:scale-105 transition-all duration-300 ",

    add: "border border-[#0C46C4] text-[#0C46C4] hover:bg-[#0C46C4] hover:text-white px-6 py-1.5 rounded-lg shadow-md  font-medium text-sm gap-2 whitespace-nowrap hover:scale-105 transition-all duration-300 cursor-pointer ",

    reset:
      " border border-gray-300 rounded-lg px-3 py-1 md:py-1 text-sm outline-none focus:border-[#0C46C4] cursor-pointer bg-white shadow-sm hover:text-red-500 font-medium transition-all duration-300 hover:scale-105 ",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
