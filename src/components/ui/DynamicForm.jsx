import React, { useState } from "react";
import CustomDropdown from "../ui/CustomDropdown";
import Button from "../ui/Button";
import { IoEye, IoEyeOff } from "react-icons/io5";

const DynamicForm = ({
  fields,
  formData,
  setFormData,
  onSubmit,
  title,
  children,
  headerActions,
  className = "mt-10 grid grid-cols-2 gap-4 max-w-3xl bg-white md:p-8 rounded-2xl pt-10 relative",
  showDefaultHeader = true,
  buttonAreaClassName = "col-span-2 flex flex-col items-center justify-center mt-6",
  submitButtonClassName = "",
  submitButtonVariant = "primary",
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState({});

  const handleChange = (name, value, type, files) => {
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = (name) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <form className={`w-full ${className}`} onSubmit={onSubmit}>
      {showDefaultHeader && (
        <div className="col-span-2 flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-[#0C46C4]">{title}</h3>
          {headerActions && <div className="flex gap-2">{headerActions}</div>}
        </div>
      )}

      {fields.map((field, index) => {
        const isPasswordField = field.inputType === "password";
        const isVisible = passwordVisibility[field.name];

        return (
          <div
            key={index}
            className={`flex flex-col gap-2 ${
              field.fullWidth ? "col-span-2" : "col-span-1"
            } ${field.containerClassName || ""}`}
          >
            {field.label && (
              <label
                className={`text-md font-semibold ${field.labelClassName || ""}`}
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            <div className="relative w-full">
              {/* INPUT (text, email, password, date, file, etc.) */}
              {field.type === "input" && (
                <div className="relative">
                  <input
                    type={
                      isPasswordField
                        ? isVisible
                          ? "text"
                          : "password"
                        : field.inputType
                    }
                    name={field.name}
                    value={
                      field.inputType === "file"
                        ? undefined
                        : formData[field.name] || ""
                    }
                    onChange={(e) =>
                      handleChange(
                        field.name,
                        e.target.value,
                        field.inputType,
                        e.target.files,
                      )
                    }
                    placeholder={field.placeholder}
                    required={field.required}
                    className={`w-full p-2 text-sm focus:outline-none transition-all ${
                      field.inputClassName ||
                      "border border-[#0C46C4] rounded-md"
                    }`}
                  />

                  {/* Icons Handling */}
                  {isPasswordField ? (
                    <div
                      className="absolute right-0 top-1/2 -translate-y-1/2 cursor-pointer text-[#0C46C4]
                      hover:scale-110 transition duration-300  hover:text-blue-700"
                      onClick={() => togglePasswordVisibility(field.name)}
                    >
                      {isVisible ? <IoEye size={20} /> : <IoEyeOff size={20} />}
                    </div>
                  ) : (
                    field.rightIcon && (
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 text-[#0C46C4]">
                        {field.rightIcon}
                      </div>
                    )
                  )}
                </div>
              )}

              {/* TEXTAREA */}
              {field.type === "textarea" && (
                <textarea
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  required={field.required}
                  className={`w-full p-2 text-sm focus:outline-none min-h-[100px] ${
                    field.inputClassName || "border border-[#0C46C4] rounded-md"
                  }`}
                />
              )}

              {/* DROPDOWN */}
              {field.type === "dropdown" && (
                <CustomDropdown
                  options={
                    typeof field.options === "function"
                      ? field.options(formData)
                      : field.options
                  }
                  value={formData[field.name]}
                  onChange={(val) => handleChange(field.name, val)}
                  placeholder={field.placeholder}
                  containerClassName="w-full"
                  triggerClassName={
                    field.inputClassName || "border border-[#0C46C4] rounded-lg"
                  }
                  multiSelect={field.multiSelect}
                  searchable={field.searchable}
                />
              )}
            </div>
          </div>
        );
      })}

      <div className={buttonAreaClassName}>
        <Button
          type="submit"
          variant={submitButtonVariant}
          className={submitButtonClassName}
        >
          {children}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
