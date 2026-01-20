import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const HomeWorkStudent = () => {
  return (
    <section className='w-full  py-10 flex flex-col   items-center justify-center '>
          {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/homeworkwhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Home Work
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/student-dashboard"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>

    <form action="" className='w-full flex flex-col  items-center justify-center px-8 mt-30 md:mt-30 gap-6 max-w-7xl'>
        <div className=' px-10 flex flex-col items-center justify-center gap-4 text-center'>
            <h1 className=' text-2xl text-[#0C46C4] font-semibold'>Math_2078/homework file name/</h1>
        </div>

        <div className='flex w-full max-w-2xl space-y-2  flex-col'>
            <input type="text" className=' w-full outline-none  border-2 w-10 h-40 py-2 bg-[#C4C4C4]  rounded'  />
        </div>

     <button className="flex items-center justify-center text-xl mt-20 w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg mt-6 ">Download your Homework</button>
    </form>

      
    </section>
  )
}

export default HomeWorkStudent;
