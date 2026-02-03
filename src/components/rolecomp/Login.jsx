import { useState } from "react";
import { FaUser } from "react-icons/fa";
import DynamicForm from "../ui/DynamicForm";

const Login = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would validate credentials
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const loginFields = [
    {
      name: "username",
      label: "Username",
      type: "input",
      inputType: "text",
      placeholder: "Enter username/email",
      required: true,
      fullWidth: true,
      rightIcon: <FaUser size={18} />,
      inputClassName:
        "pb-2 md:pb-3 border-b-2 border-gray-300 transition-all text-xs sm:text-sm md:text-base text-gray-600 placeholder-gray-400",
      labelClassName:
        "text-xs sm:text-sm md:text-base font-semibold text-black",
      containerClassName: "gap-1 sm:gap-1.5",
    },
    {
      name: "password",
      label: "Password",
      type: "input",
      inputType: "password",
      placeholder: "***************",
      required: true,
      fullWidth: true,
      inputClassName:
        "pb-2 md:pb-3 border-b-2 border-gray-300 transition-all text-xs sm:text-sm md:text-base text-gray-600 tracking-widest placeholder-gray-400",
      labelClassName:
        "text-xs sm:text-sm md:text-base font-semibold text-black",
      containerClassName: "gap-1 sm:gap-1.5",
    },
  ];

  return (
    <div className="w-full  flex flex-col items-center">
      <DynamicForm
        fields={loginFields}
        formData={loginData}
        setFormData={setLoginData}
        onSubmit={handleSubmit}
        showDefaultHeader={false}
        className="max-w-md flex flex-col gap-4 sm:gap-5 md:gap-6 px-4"
        buttonAreaClassName="w-full flex flex-col items-center"
        submitButtonClassName="hover:brightness-90 active:brightness-75 text-white py-2 md:py-2 rounded-lg md:rounded-xl text-xs sm:text-sm md:text-sm font-bold w-full max-w-[180px] shadow-md transition-all active:scale-95 flex items-center justify-center"
        submitButtonVariant="primary"
      >
        Login
      </DynamicForm>

      {/* Forgot Password */}
      <a
        href="#"
        className="text-center text-gray-500 text-xs sm:text-sm md:text-sm mt-4 transition-colors hover:underline"
        style={{ hover: { color: "var(--primary-color)" } }} // Note: hover style via inline is tricky, better to use CSS or just rely on global if possible.
        // I'll just remove the hover:text-blue-600 and let it be.
      >
        Forgot Password ?
      </a>
    </div>
  );
};

export default Login;
