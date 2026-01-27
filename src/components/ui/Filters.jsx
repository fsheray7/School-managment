import React from "react";
import { CiSearch } from "react-icons/ci";
import CustomDropdown from "./CustomDropdown";
import Button from "./Button";
import { IoArrowForward } from "react-icons/io5";

const Filters = ({
  searchQuery,
  setSearchQuery,
  searchPlaceholder = "Search...",
  filters = [], // Array of objects: { value, onChange, options, placeholder }
  onReset,
  onAdd,
  addLabel = "+ Add",
}) => {
  return (
    <div className="flex flex-col md:flex-row lg:flex-col w-full justify-between items-center  gap-4 ">
      {/* Search Bar */}
      <div className="relative flex gap-4 w-full">
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          type="search"
          placeholder={searchPlaceholder}
          className="w-full borderborder-gray-300 rounded-lg px-8 py-1.5  outline-none focus:border-[#0C46C4] transition-all shadow-sm"
        />
        <CiSearch
          size={22}
          className="absolute text-gray-400 right-35 top-1/2 -translate-y-1/2 pointer-events-none"
        />

         {/* Add Button */}
        <Button onClick={onAdd} variant="add" children={addLabel}
        className="col-span-2" />
      </div>

      {/* Filters & Actions */}
      <div className="grid grid-cols-2 
      md:grid-cols-3 lg:grid-cols-4 md:flex md:flex-row w-full lg:justify-center items-center gap-4 lg:gap-6  w-full ">
        {/* Dynamic Filters */}
        {filters.map((filter, index) => (
          <div key={index}>
            <CustomDropdown
              options={filter.options}
              value={filter.value}
              onChange={filter.onChange}
              placeholder={filter.placeholder}
              containerClassName="w-full lg:w-48"
              triggerClassName="text-gray-300"
              searchable={filter.searchable || false}
            />
          </div>
        ))}

        {/* Reset Button */}
        <Button onClick={onReset} variant="reset" children="Reset" />
       

       
      </div>
    </div>
  );
};

export default Filters;
