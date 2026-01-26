import React from 'react'
import { CiSearch } from 'react-icons/ci'
import CustomDropdown from './CustomDropdown'

const Filters = ({
    searchQuery,
    setSearchQuery,
    searchPlaceholder = "Search...",
    filters = [], // Array of objects: { value, onChange, options, placeholder }
    onReset,
    onAdd,
    addLabel = "+ Add"
}) => {
    return (
        <div className='flex flex-col md:flex-row lg:flex-row w-full justify-between items-center  gap-4 '>

            {/* Search Bar */}
            <div className='relative w-full'>
                <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    type="search"
                    placeholder={searchPlaceholder}
                    className='w-full border-2 border-gray-300 rounded-lg px-8 py-1.5  outline-none focus:border-[#0C46C4] transition-all shadow-sm'
                />
                <CiSearch size={22} className='absolute text-gray-400 right-3 top-1/2 -translate-y-1/2 pointer-events-none' />
            </div>

            {/* Filters & Actions */}
            <div className='grid grid-cols-2 md:flex md:flex-row w-full lg:justify-center items-center gap-2  w-full '>

                {/* Dynamic Filters */}
                {filters.map((filter, index) => (
                    <div key={index} className="w-full">
                        <CustomDropdown
                            options={filter.options}
                            value={filter.value}
                            onChange={filter.onChange}
                            placeholder={filter.placeholder}
                        />
                    </div>
                ))}

                {/* Reset Button */}
                <button
                    onClick={onReset}
                    className='w-full  text-gray-500 border-2 border-gray-300 rounded-lg px-3 py-1 md:py-2 text-sm outline-none focus:border-[#0C46C4] cursor-pointer bg-white shadow-sm hover:text-red-500 font-medium transition-colors'
                >
                    Reset
                </button>

                {/* Add Button */}
                <button
                    onClick={onAdd}
                    className='col-span-2 md:col-span-1 border-2 border-[#0C46C4] text-[#0C46C4] hover:bg-[#0C46C4] hover:text-white px-4 py-1.5 rounded-lg shadow-md transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2 whitespace-nowrap'
                >
                    {addLabel}
                </button>
            </div>
        </div>
    )
}

export default Filters
