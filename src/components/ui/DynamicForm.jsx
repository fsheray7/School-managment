import CustomDropdown from "../ui/CustomDropdown";
import Button from "../ui/Button";

const DynamicForm = ({
  fields,
  formData,
  setFormData,
  onSubmit,
  title,
  children,
  headerActions,
}) => {
  const handleChange = (name, value, type, files) => {
    if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  return (
    <form
      className="w-full mt-20 grid grid-cols-2 gap-4 max-w-3xl bg-white md:p-8 rounded-2xl relative"
      onSubmit={onSubmit}
    >
      <div className="col-span-2 flex items-center justify-between">
        <h3 className="text-2xl font-bold text-[#0C46C4]">{title}</h3>
        {headerActions && <div className="flex gap-2">{headerActions}</div>}
      </div>

      {fields.map((field, index) => (
        <div
          key={index}
          className={`flex flex-col gap-2 ${
            field.fullWidth ? "col-span-2" : "col-span-1"
          }`}
        >
          <label className="text-md font-semibold">
            {field.label}{" "}
            {field.required && <span className="text-red-500">*</span>}
          </label>

          {/* INPUT (text, email, password, date, file, etc.) */}
          {field.type === "input" && (
            <input
              type={field.inputType}
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
              className="border border-[#0C46C4] rounded-md p-2 text-sm focus:outline-none"
            />
          )}

          {/* TEXTAREA */}
          {field.type === "textarea" && (
            <textarea
              name={field.name}
              value={formData[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="border border-[#0C46C4] rounded-md p-2 text-sm focus:outline-none min-h-[100px]"
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
              triggerClassName="border border-[#0C46C4] rounded-lg"
              multiSelect={field.multiSelect}
              searchable={field.searchable}
            />
          )}
        </div>
      ))}

      <div className="col-span-2 flex justify-center mt-6">
        <Button type="submit" variant="primary">
          {children}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
