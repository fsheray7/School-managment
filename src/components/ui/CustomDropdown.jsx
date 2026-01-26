import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  containerClassName = "w-full md:w-25 lg:w-30",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full md:w-25  lg:w-30" ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full border-2 rounded-lg px-3 py-1 md:px-3 md:py-2 lg:px-3 lg:py-2 text-sm cursor-pointer bg-white transition-all duration-200 shadow-sm
                    ${isOpen ? "border-[#0C46C4] ring-2 ring-[#0C46C4]/20" : "border-gray-300 hover:border-[#0C46C4]"}
                `}
      >
        <span
          className={`truncate ${!value ? "text-gray-500" : "text-gray-800"}`}
        >
          {value || placeholder}
        </span>
        <FaChevronDown
          size={12}
          className={`text-gray-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden animate-fade-in-down">
          <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {/* Placeholder/Reset Option */}
            <li
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer h-full"
            >
              {placeholder}
            </li>

            {options.map((option, index) => (
              <li
                key={index}
                onClick={() => handleSelect(option)}
                className={`px-2 py-2 text-sm cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-0
                                    ${
                                      value === option
                                        ? "bg-blue-50 text-[#0C46C4] font-medium"
                                        : "text-gray-700 hover:bg-gray-50 hover:text-[#0C46C4]"
                                    }
                                `}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
