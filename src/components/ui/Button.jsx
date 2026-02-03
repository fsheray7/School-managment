import React from "react";

const Button = ({
  variant = "primary",
  onClick,
  type = "button",
  icon,
  children,
  className = "",
  disabled = false,
  ...props
}) => {
  const base =
    "flex justify-center items-center gap-2 font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary:
      "bg-[var(--primary-color)] hover:brightness-90 cursor-pointer hover:scale-105 transition-all duration-300 text-white rounded-md px-6 py-2 text-sm ",

    ghost:
      "text-[var(--primary-color)] hover:text-[var(--primary-color)] cursor-pointer px-4 py-2 rounded-full hover:scale-110 transition-all duration-300 hover:bg-[var(--primary-color)]/20",

    danger:
      "bg-red-600 hover:bg-red-700 text-white rounded-md px-6 py-2 cursor-pointer hover:scale-105 transition-all duration-300 ",

    success:
      "bg-green-600 hover:bg-green-700 text-white rounded-md px-6 py-2 cursor-pointer hover:scale-105 transition-all duration-300 ",

    add: "border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white px-6 py-1.5 rounded-lg shadow-md font-medium text-sm gap-2 whitespace-nowrap hover:scale-105 transition-all duration-300 cursor-pointer ",

    reset:
      " border border-gray-300 rounded-lg px-6 py-1 md:py-2 text-sm outline-none focus:border-[var(--primary-color)] cursor-pointer bg-white shadow-sm hover:text-red-500 font-medium transition-all duration-300 hover:scale-105 ",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};

export default Button;
