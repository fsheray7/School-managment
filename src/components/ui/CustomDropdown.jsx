import { useState, useRef, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const CustomDropdown = ({
  options,
  value,
  onChange,
  placeholder,
  containerClassName = "w-full",
  triggerClassName = "",
  searchable = false, // New prop for search functionality
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option) => {
    onChange(option);
    setIsOpen(false);
    setSearchQuery("");
  };

  // Filter options based on search query
  const filteredOptions = searchable
    ? options.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between  w-full border rounded-lg px-3 py-1 md:px-3 md:py-2 lg:px-3 lg:py-1 text-sm cursor-pointer bg-white transition-all  duration-200 shadow-sm
                    ${isOpen ? " " : ""}
                    
                    ${triggerClassName || "border-gray-300"}
                `}
      >
        <span
          className={`truncate ${!value ? "text-gray-500 " : "text-gray-800"}`}
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
          {/* Search Input - Only show if searchable is true */}
          {searchable && (
            <div className="p-2 border-b border-gray-100">
              <div className="relative">
                <CiSearch
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Type to search..."
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[#0C46C4] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {/* Placeholder/Reset Option */}
            <li
              onClick={() => handleSelect("")}
              className="px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer h-full"
            >
              {placeholder}
            </li>

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => (
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
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-gray-400 text-center">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
