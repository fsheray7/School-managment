import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

const CustomDropdown = ({
  title,
  options,
  value,
  onChange,
  placeholder,
  containerClassName = "w-full",
  triggerClassName = "",
  searchable = false,
  multiSelect = false,
  creatable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

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

  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);

  const handleSelect = (option) => {
    if (multiSelect) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValue = currentValues.includes(option)
        ? currentValues.filter((v) => v !== option)
        : [...currentValues, option];
      onChange(newValue);
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchQuery("");
    }
  };

  const removeOption = (e, option) => {
    e.stopPropagation();
    if (multiSelect && Array.isArray(value)) {
      onChange(value.filter((v) => v !== option));
    }
  };

  const filteredOptions = searchable
    ? options.filter((option) =>
        option.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : options;

  const showCreatableOption =
    creatable &&
    searchable &&
    searchQuery.trim() !== "" &&
    !filteredOptions.some(
      (opt) => opt.toLowerCase() === searchQuery.toLowerCase(),
    );

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && showCreatableOption) {
      e.preventDefault();
      handleSelect(searchQuery.trim());
    }
  };

  const renderTrigger = () => {
    const isEmpty = multiSelect
      ? !Array.isArray(value) || value.length === 0
      : !value;

    if (!isEmpty && multiSelect && Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1 max-w-full overflow-hidden py-0.5">
          {value.map((val) => (
            <span
              key={val}
              className="px-2 py-0.5 rounded-full flex items-center gap-1 text-xs"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
              }}
            >
              <span>{val}</span>
              <FaTimes
                size={8}
                className="cursor-pointer hover:text-red-200"
                onClick={(e) => removeOption(e, val)}
              />
            </span>
          ))}
        </div>
      );
    }
    return (
      <span
        className={`truncate  ${isEmpty ? "text-gray-400" : "text-gray-800"}`}
      >
        {isEmpty ? placeholder : value}
      </span>
    );
  };

  return (
    <div className={`relative ${containerClassName}`} ref={dropdownRef}>
      {title && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {title}
        </label>
      )}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full rounded-md px-3 py-2 text-sm cursor-pointer bg-white transition-all duration-200 shadow-sm
                    ${triggerClassName || "border-gray-300"}
                `}
      >
        {renderTrigger()}
        <FaChevronDown
          size={12}
          className={`text-gray-400 ml-2 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50  animate-fade-in-down">
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
                  onKeyDown={handleKeyDown}
                  placeholder={
                    creatable ? "Type or select..." : "Type to search..."
                  }
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          )}

          <ul className="max-h-60 overflow-y-auto py-1 custom-scrollbar">
            {!multiSelect && (
              <li
                onClick={() => handleSelect("")}
                className="px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 cursor-pointer"
              >
                {placeholder}
              </li>
            )}

            {showCreatableOption && (
              <li
                onClick={() => handleSelect(searchQuery.trim())}
                className="px-4 py-2 text-sm cursor-pointer transition-colors duration-150 bg-blue-50 text-blue-600 hover:bg-blue-100 border-b border-gray-100"
              >
                <div className="flex items-center gap-2">
                  <span className="font-medium">Create:</span> "{searchQuery}"
                </div>
              </li>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((option, index) => {
                const isSelected = multiSelect
                  ? Array.isArray(value) && value.includes(option)
                  : value === option;
                return (
                  <li
                    key={index}
                    onClick={() => handleSelect(option)}
                    className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 border-b border-gray-50 last:border-0
                                          isSelected
                                            ? "bg-[var(--primary-color)]/10 font-medium"
                                            : "text-gray-700 hover:bg-gray-100"
                                        }
                                    `}
                  >
                    <div className="flex items-center justify-between">
                      {option}
                      {multiSelect && (
                        <input
                          type="checkbox"
                          checked={isSelected}
                          readOnly
                          className="accent-[var(--primary-color)]"
                        />
                      )}
                    </div>
                  </li>
                );
              })
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
