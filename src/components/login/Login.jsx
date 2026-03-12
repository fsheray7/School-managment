import { useState } from "react";
import { FaUser } from "react-icons/fa";
import DynamicForm from "../ui/DynamicForm";
import studentsData from "../../data/admindata/students/students";
import teachersData from "../../data/teachers/teacher";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import { useSettings } from "../../context/SettingsContext";
import { admins as defaultAdmins } from "../../data/admindata/superadmin/admins";
import { useTeacher } from "../../context/TeacherContext";
import { useStudent } from "../../context/StudentContext";
import { useAdmin } from "../../context/AdminContext";

const Login = ({ onLoginSuccess, role }) => {
  const { showToast } = useToast();
  const navigate = useNavigate();
  const { superAdminUsername, superAdminPassword, setIsSuperAdmin } =
    useSettings();
  const { loginTeacher } = useTeacher();
  const { loginStudent } = useStudent();
  const { admins, loginAdmin } = useAdmin();
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (role === "student") {
      const student = studentsData.find(
        (s) =>
          s.userName === loginData.username &&
          s.password === loginData.password,
      );

      if (student) {
        showToast(`Welcome back, ${student.fullName}!`, "success");
        loginStudent(student);
        if (onLoginSuccess) {
          onLoginSuccess(student);
        }
      } else {
        showToast("Invalid username or password!", "error");
      }
    } else if (role === "teacher") {
      const teacher = teachersData.find(
        (t) =>
          t.userName === loginData.username &&
          t.password === loginData.password,
      );

      if (teacher) {
        showToast(`Welcome back, ${teacher.fullName}!`, "success");
        loginTeacher(teacher);
        if (onLoginSuccess) {
          onLoginSuccess(teacher);
        }
      } else {
        showToast("Invalid username or password!", "error");
      }
    } else if (role === "admin") {
      const admin = admins.find(
        (a) =>
          a.username === loginData.username &&
          a.password === loginData.password,
      );

      if (admin && admin.status === "Active") {
        loginAdmin(admin);
        showToast("Logged in as Administrator!", "success");
        if (onLoginSuccess) {
          onLoginSuccess({ role: "admin", fullName: admin.name });
        }
      } else {
        showToast("Invalid admin credentials!", "error");
      }
    } else if (role === "super-admin") {
      if (
        loginData.username.trim() === superAdminUsername &&
        loginData.password.trim() === superAdminPassword
      ) {
        showToast("Logged in as Super Administrator!", "success");
        setIsSuperAdmin(true);
        if (onLoginSuccess) {
          onLoginSuccess({ role: "super-admin" });
        } else {
          navigate("/super-admin-dashboard");
        }
      } else {
        showToast("Invalid super admin credentials!", "error");
      }
    } else {
      // Default success for other roles for now
      showToast("Logged in successfully!", "success");
      if (onLoginSuccess) {
        onLoginSuccess();
      }
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
      rightIcon: <FaUser size={20} />,
      inputClassName:
        "pb-2 md:pb-3 border-b-2 border-gray-300 transition-all text-[16px] text-gray-600 placeholder-gray-400 focus:border-[var(--primary-color)]",
      labelClassName: "text-[16px] font-semibold text-black",
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
        "pb-2 md:pb-3 border-b-2 border-gray-300 transition-all text-[16px] text-gray-600 tracking-widest placeholder-gray-400 focus:border-[var(--primary-color)]",
      labelClassName: "text-[16px] font-semibold text-black",
      containerClassName: "gap-1 sm:gap-1.5",
    },
  ];

  return (
    <div className="w-full  flex mt-20 flex-col items-center">
      <DynamicForm
        fields={loginFields}
        formData={loginData}
        setFormData={setLoginData}
        onSubmit={handleSubmit}
        showDefaultHeader={false}
        className="max-w-md flex flex-col gap-6 px-4"
        buttonAreaClassName="w-full flex mt-4 flex-col items-center"
        submitButtonClassName="hover:brightness-90 active:brightness-75 text-white py-3 rounded-xl text-[16px] font-bold w-full max-w-[200px] shadow-lg transition-all active:scale-95 flex items-center justify-center bg-[var(--primary-color)]"
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
