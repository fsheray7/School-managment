import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../context/ToastContext";
import DynamicForm from "../../components/ui/DynamicForm";
import { FaUserPlus, FaArrowLeft } from "react-icons/fa";
import Button from "../../components/ui/Button";
import { getAdmins, saveAdmins } from "../../utils/adminStorage";

const AddAdmin = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    school: "",
    department: "",
    username: "",
    password: "",
    confirmPassword: "",
    status: "Active",
    profileImage: null,
  });

  const fields = [
    {
      name: "profileImage",
      label: "Profile Photo",
      type: "image",
      fullWidth: true,
    },
    {
      name: "name",
      label: "Full Name",
      type: "input",
      inputType: "text",
      placeholder: "Enter full name",
      required: true,
    },
    {
      name: "email",
      label: "Email Address",
      type: "input",
      inputType: "email",
      placeholder: "admin@school.edu",
      required: true,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "input",
      inputType: "tel",
      placeholder: "+92 3XX XXXXXXX",
      required: true,
    },
    {
      name: "school",
      label: "Assigned School",
      type: "dropdown",
      placeholder: "Select School",
      options: [
        "Beaconhouse School",
        "City School",
        "Roots International",
        "LGS School",
      ],
      required: true,
      creatable: true,
      searchable: true,
    },
    {
      name: "status",
      label: "Account Status",
      type: "dropdown",
      options: ["Active", "Inactive"],
      required: true,
    },
    {
      name: "username",
      label: "Login Username",
      type: "input",
      inputType: "text",
      placeholder: "Choose a unique username",
      required: true,
      fullWidth: false,
    },
    {
      name: "password",
      label: "Password",
      type: "input",
      inputType: "password",
      placeholder: "Enter password",
      required: true,
    },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "input",
      inputType: "password",
      placeholder: "Re-enter password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentAdmins = getAdmins();

    // Validation for duplicate email or username
    if (currentAdmins.some((admin) => admin.email === formData.email)) {
      showToast("An admin with this email already exists.", "error");
      return;
    }
    if (currentAdmins.some((admin) => admin.username === formData.username)) {
      showToast("This username is already taken.", "error");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    let profileImageBase64 = null;
    if (formData.profileImage instanceof File) {
      profileImageBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(formData.profileImage);
      });
    }

    const { confirmPassword, ...adminData } = formData;

    const newAdmin = {
      id: Date.now(),
      ...adminData,
      profileImage: profileImageBase64,
    };

    const updatedAdmins = [...currentAdmins, newAdmin];

    saveAdmins(updatedAdmins);

    showToast("Administrator added successfully!", "success");
    navigate("/super-admin-admins");
  };

  return (
    <div className="p-4 md:p-6 flex flex-col gap-1 max-w-7xl ">
      {/* Header section with back button */}
      <div className="flex items-center justify-between bg-white px-1 md:px-6 py-1 md:py-3 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => navigate("/super-admin-admins")}
            variant="ghost"
          >
            <FaArrowLeft size={18} />
          </Button>
          <div>
            <h1 className="text-xs md:text-md font-bold text-gray-800">
              Add New Administrator
            </h1>
            <p className="text-xs md:text-sm text-gray-500">
              Create a school management account
            </p>
          </div>
        </div>
        <div className="flex md:hidden p-2 md:p-3 bg-[var(--primary-color)]/10 rounded-2xl text-[var(--primary-color)]">
          <FaUserPlus size={24} />
        </div>
      </div>

      {/* Main form card */}
      <div className="bg-white p-2 md:p-8 rounded-3xl  mb-6">
        <DynamicForm
          fields={fields}
          formData={formData}
          setFormData={setFormData}
          onSubmit={handleSubmit}
        >
          CREATE ADMIN
        </DynamicForm>
      </div>
    </div>
  );
};

export default AddAdmin;
