import React, { useState } from "react";
import CustomDropdown from "../ui/CustomDropdown";
import Button from "../ui/Button";
import FileUpload from "../ui/FileUpload";
import { IoEye, IoEyeOff } from "react-icons/io5";

const DynamicForm = ({
  fields,
  formData,
  setFormData,
  onSubmit,
  children,
  onClick,
  className = "grid grid-cols-1 sm:grid-cols-2 gap-x-2 md:gap-x-8 gap-y-2 md:gap-y-3 max-w-2xl bg-white px-1 py-2 md:p-4 rounded-lg relative",
  showDefaultHeader = true,
  buttonAreaClassName = "col-span-2 sm:col-span-2 flex gap-4 items-center justify-center mt-2 border-t border-gray-50 ",
  submitButtonClassName = "w-full sm:w-64  rounded-2xl shadow-lg font-bold",
  submitButtonVariant = "primary",
  readOnly = false,
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
    <form className={`w-full max-w-2xl ${className}`} onSubmit={onSubmit}>
      {showDefaultHeader && (
        <div className="col-span-2 flex items-center justify-end "></div>
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
                className={`text-xs md:text-sm font-semibold text-gray-700 ${field.labelClassName || ""}`}
              >
                {field.label}{" "}
                {field.required && <span className="text-red-500">*</span>}
              </label>
            )}

            <div className="relative w-full">
              {/* IMAGE TYPE (special handling for profile photos) */}
              {field.type === "image" && (
                <div className="flex flex-col items-center justify-center mb-4">
                  <div className="relative group">
                    <img
                      src={
                        formData[field.name] instanceof File
                          ? URL.createObjectURL(formData[field.name])
                          : formData[field.name] ||
                            `https://ui-avatars.com/api/?name=${formData.name || formData.fullName}&background=random`
                      }
                      alt={formData.name || formData.fullName}
                      className="w-24 h-24 rounded-full object-contain border-4 border-gray-100 shadow-md"
                    />
                    {!readOnly && (
                      <label
                        className="absolute bottom-0 right-0 text-white p-1.5 rounded-full cursor-pointer transition-colors shadow-sm hover:brightness-90"
                        style={{ backgroundColor: "var(--primary-color)" }}
                      >
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={(e) => {
                            if (e.target.files[0]) {
                              handleChange(
                                field.name,
                                null,
                                "file",
                                e.target.files,
                              );
                            }
                          }}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </label>
                    )}
                  </div>
                  {!readOnly && (
                    <span className="text-[10px] text-gray-400 mt-2">
                      Click icon to change
                    </span>
                  )}
                </div>
              )}

              {/* INPUT (text, email, password, date, etc.) */}
              {field.type === "input" && field.inputType !== "file" && (
                <div className="relative">
                  {readOnly ? (
                    field.render ? (
                      field.render(formData)
                    ) : (
                      <div className="w-full max-w-3xl px-3 py-2.5 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-100 text-gray-700 font-medium whitespace-pre-wrap min-h-[40px] flex items-center justify-between">
                        <span>
                          {isPasswordField
                            ? isVisible
                              ? formData[field.name] || (
                                  <span className="text-gray-300 italic">
                                    Not set
                                  </span>
                                )
                              : "••••••••"
                            : formData[field.name] || (
                                <span className="text-gray-300 italic">
                                  Not set
                                </span>
                              )}
                        </span>
                        {isPasswordField && (
                          <div
                            className="cursor-pointer hover:scale-110 transition duration-300 hover:brightness-90 ml-2"
                            style={{ color: "var(--primary-color)" }}
                            onClick={() => togglePasswordVisibility(field.name)}
                          >
                            {isVisible ? (
                              <IoEye size={16} />
                            ) : (
                              <IoEyeOff size={16} />
                            )}
                          </div>
                        )}
                      </div>
                    )
                  ) : (
                    <>
                      <input
                        type={
                          isPasswordField
                            ? isVisible
                              ? "text"
                              : "password"
                            : field.inputType
                        }
                        name={field.name}
                        value={formData[field.name] || ""}
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
                        className={`w-full px-3 py-2.5 text-xs md:text-sm focus:outline-none transition-all ${
                          field.inputClassName ||
                          "border border-gray-300 rounded-md bg-gray-50/30 focus:bg-white focus:border-[var(--primary-color)] shadow-sm"
                        }`}
                      />

                      {/* Icons Handling */}
                      {isPasswordField ? (
                        <div
                          className={`absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer
                          hover:scale-110 transition duration-300 hover:brightness-90`}
                          style={{ color: "var(--primary-color)" }}
                          onClick={() => togglePasswordVisibility(field.name)}
                        >
                          {isVisible ? (
                            <IoEye size={16} />
                          ) : (
                            <IoEyeOff size={16} />
                          )}
                        </div>
                      ) : (
                        field.rightIcon && (
                          <div
                            className="absolute right-0 top-1/2 -translate-y-1/2"
                            style={{ color: "var(--primary-color)" }}
                          >
                            {field.rightIcon}
                          </div>
                        )
                      )}
                    </>
                  )}
                </div>
              )}

              {/* FILE UPLOAD (handled by FileUpload component) */}
              {field.type === "input" && field.inputType === "file" && (
                <div className="w-full">
                  {readOnly ? (
                    <div className="w-full px-3 py-2.5 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-100 text-gray-700 font-medium h-10 flex items-center">
                      {formData[field.name] ? (
                        <span className="truncate">
                          {formData[field.name] instanceof File
                            ? formData[field.name].name
                            : "File attached"}
                        </span>
                      ) : (
                        <span className="text-gray-300 italic">No file</span>
                      )}
                    </div>
                  ) : (
                    <FileUpload
                      file={formData[field.name]}
                      onChange={(e) =>
                        handleChange(
                          field.name,
                          e.target.value,
                          field.inputType,
                          e.target.files,
                        )
                      }
                      onClear={() =>
                        setFormData((prev) => ({ ...prev, [field.name]: null }))
                      }
                      helperText="" // DynamicForm usually handles its own labels/context
                    />
                  )}
                </div>
              )}

              {/* TEXTAREA */}
              {field.type === "textarea" && (
                <div className="w-full">
                  {readOnly ? (
                     field.render ? (
                      field.render(formData)
                    ) : (
                    <div className="w-full p-3 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-100 text-gray-700 font-medium whitespace-pre-wrap min-h-[100px]">
                      {formData[field.name] || (
                        <span className="text-gray-300 italic">No content</span>
                      )}
                    </div>
                    )
                  ) : (
                    <textarea
                      name={field.name}
                      value={formData[field.name] || ""}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      required={field.required}
                      className={`w-full p-2 text-sm focus:outline-none min-h-[100px] ${
                        field.inputClassName ||
                        "border border-gray-300 rounded-md"
                      }`}
                    />
                  )}
                </div>
              )}

              {/* DROPDOWN */}
              {field.type === "dropdown" && (
                <div className="w-full">
                  {readOnly ? (
                     field.render ? (
                      field.render(formData)
                    ) : (
                    <div className="w-full px-3 py-2.5 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-100 text-gray-700 font-medium h-10 flex items-center">
                      {formData[field.name] ? (
                        Array.isArray(formData[field.name]) ? (
                          formData[field.name].join(", ")
                        ) : (
                          formData[field.name]
                        )
                      ) : (
                        <span className="text-gray-300 italic">
                          Not selected
                        </span>
                      )}
                    </div>
                    )
                  ) : (
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
                        field.inputClassName ||
                        "border border-gray-300 rounded-lg"
                      }
                      multiSelect={field.multiSelect}
                      searchable={field.searchable}
                      creatable={field.creatable}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        );
      })}

      {(!readOnly || children || onClick) && (
        <div className={buttonAreaClassName}>
          {!readOnly && children && (
            <Button
              type="submit"
              variant={submitButtonVariant}
              className={submitButtonClassName}
            >
              {children}
            </Button>
          )}
          {onClick && (
            <Button type="button" onClick={onClick}>
              {readOnly ? "Close" : "Back"}
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default DynamicForm;
