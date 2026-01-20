import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomeWork = () => {
  return (
    <section className='w-full  py-10 flex flex-col   items-center justify-center gap-10'>
    {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/attendancewhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Home work
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/teacher-dashboard"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>


    <form action="" className='w-full flex flex-col  items-center justify-center px-8 mt-30 md:mt-50 gap-6 max-w-7xl'>
        <div className=' px-10 flex flex-col items-center justify-center gap-4 text-center'>
            <h1 className=' text-2xl text-[#0C46C4] font-semibold'>Subject</h1>
        </div>

        <div className='flex w-full max-w-2xl space-y-2  flex-col'>
            <label className='text-xl'>Add Homework</label>
            <input type="text" className=' w-full outline-none  border-2 border-[#0C46C4] py-2  rounded'  />
        </div>

        <button className=' mt-6   text-[#FFFFFF] px-35 md:px- py-3 rounded-md bg-[#0C46C4]'>Submit</button>
    </form>

    <p className='text-[#0C46C4] mt-4'>File is uploaded sucessfully</p>
      
    </section>
  )
}

export default HomeWork
