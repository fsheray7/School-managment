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
  className = "grid grid-cols-1 sm:grid-cols-2 gap-x-2 md:gap-x-8 gap-y-4 md:gap-y-6 max-w-2xl bg-white px-1  rounded-lg relative",
  showDefaultHeader = true,
  buttonAreaClassName = "col-span-2 sm:col-span-2 flex gap-4 items-center justify-center mt-6 border-t border-gray-50 pt-4",
  submitButtonClassName = "w-full rounded-2xl shadow-lg font-bold",
  submitButtonVariant = "primary",
  readOnly = false,
}) => {
  const [passwordVisibility, setPasswordVisibility] = useState({});
  const [focusedField, setFocusedField] = useState(null);

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

  const handleFocus = (fieldName) => {
    setFocusedField(fieldName);
  };

  const handleBlur = () => {
    setFocusedField(null);
  };

  // Check if field has value
  const hasValue = (field) => {
    const value = formData[field.name];
    return value !== null && value !== undefined && value !== "";
  };

  return (
    <form className={`w-full max-w-2xl ${className}`} onSubmit={onSubmit}>
      {showDefaultHeader && (
        <div className="col-span-2 flex items-center justify-end "></div>
      )}

      {fields.map((field, index) => {
        const isPasswordField = field.inputType === "password";
        const isVisible = passwordVisibility[field.name];
        const isFocused = focusedField === field.name;
        const fieldHasValue = hasValue(field);

        // Skip floating label for image type
        if (field.type === "image") {
          return (
            <div
              key={index}
              className={`flex flex-col gap-2 ${
                field.fullWidth ? "col-span-2" : "col-span-1"
              } ${field.containerClassName || ""}`}
            >
              <div className="relative w-full">
                {/* IMAGE TYPE (special handling for profile photos) */}
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
              </div>
            </div>
          );
        }

        // Regular field with floating label
        return (
          <div
            key={index}
            className={`flex flex-col ${
              field.fullWidth ? "col-span-2" : "col-span-1"
            } ${field.containerClassName || ""}`}
          >
            <div className="relative w-full">
              {/* INPUT (text, email, password, date, etc.) */}
              {field.type === "input" && field.inputType !== "file" && (
                <div className="relative">
                  {readOnly ? (
                    field.render ? (
                      field.render(formData)
                    ) : (
                      <div className="w-full max-w-3xl px-3 py-2.5 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-00 text-gray-700 font-medium whitespace-pre-wrap min-h-[40px] flex items-center justify-between">
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
                      {/* Floating Label */}
                      <label
                        className={`absolute left-3 transition-all duration-200 pointer-events-none
                          ${isFocused || fieldHasValue
                            ? '-top-2.5 text-[12px] bg-white px-1 text-gray-500'
                            : 'top-2.5 text-xs md:text-md text-gray-400'
                          }`}
                        style={{
                          transform: isFocused || fieldHasValue ? 'translateY(0)' : 'translateY(0)',
                          zIndex: 5,
                        }}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>

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
                        placeholder=""
                        required={field.required}
                        onFocus={() => handleFocus(field.name)}
                        onBlur={handleBlur}
                        className={`w-full px-3 py-2.5 text-xs md:text-sm focus:outline-none transition-all bg-transparent
                          ${isFocused 
                            ? 'border border-[var(--primary-color)] rounded-md shadow-sm' 
                            : 'border-0 border-b-2 border-gray-500 rounded-none'
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

              {/* FILE UPLOAD with border bottom style */}
              {field.type === "input" && field.inputType === "file" && (
                <div className="relative">
                  {readOnly ? (
                    <div className="w-full px-3 py-2.5 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-500 text-gray-700 font-medium h-10 flex items-center">
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
                    <div className={`transition-all ${isFocused ? 'border border-[var(--primary-color)] rounded-md p-3' : 'border-0 border-b-2 border-gray-500 rounded-none'}`}>
                      {/* Floating Label for File Upload */}
                      <label
                        className={`absolute -top-2.5 left-3 text-[10px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
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
                        helperText=""
                        onFocus={() => handleFocus(field.name)}
                        onBlur={handleBlur}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* TEXTAREA with border bottom style */}
              {field.type === "textarea" && (
                <div className="relative">
                  {readOnly ? (
                    field.render ? (
                      field.render(formData)
                    ) : (
                      <div className="w-full p-3 text-xs md:text-sm bg-gray-50/50 rounded-md border border-gray-500 text-gray-700 font-medium whitespace-pre-wrap min-h-[100px]">
                        {formData[field.name] || (
                          <span className="text-gray-300 italic">No content</span>
                        )}
                      </div>
                    )
                  ) : (
                    <>
                      {/* Floating Label */}
                      <label
                        className={`absolute left-3 transition-all duration-200 pointer-events-none
                          ${isFocused || fieldHasValue
                            ? '-top-2.5 text-[10px] bg-white px-1 text-gray-500'
                            : 'top-2.5 text-xs md:text-sm text-gray-400'
                          }`}
                        style={{ zIndex: 5 }}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <textarea
                        name={field.name}
                        value={formData[field.name] || ""}
                        onChange={(e) => handleChange(field.name, e.target.value)}
                        placeholder={field.placeholder}
                        required={field.required}
                        onFocus={() => handleFocus(field.name)}
                        onBlur={handleBlur}
                        className={`w-full p-2 pt-4 text-sm focus:outline-none min-h-[100px] bg-transparent transition-all
                          ${isFocused 
                            ? 'border border-[var(--primary-color)] rounded-md shadow-sm' 
                            : 'border-0 border-b-2 border-gray-500 rounded-none'
                          }`}
                      />
                    </>
                  )}
                </div>
              )}

              {/* DROPDOWN with border bottom style */}
              {field.type === "dropdown" && (
                <div className="relative">
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
                    <>
                      {/* Floating Label */}
                      <label
                        className={`absolute -top-2.5 left-3 text-[12px] bg-white px-1 text-gray-500 transition-all duration-200 z-10`}
                      >
                        {field.label}
                        {field.required && <span className="text-red-500 ml-1">*</span>}
                      </label>
                      <div >
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
                          triggerClassName={`pt-4  bg-transparent transition-all ${isFocused ? 'border border-[var(--primary-color)] rounded-md' : 'border-0 border-b-2 border-gray-500 rounded-none'} ${
                            field.inputClassName || ""
                          }`}
                          multiSelect={field.multiSelect}
                          searchable={field.searchable}
                          creatable={field.creatable}
                          onFocus={() => handleFocus(field.name)}
                          onBlur={handleBlur}
                        />
                      </div>
                    </>
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
               {/* Safe rendering */}
        {Array.isArray(children) ? children[0] : children}
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