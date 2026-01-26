import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom';

const HomeWorkStudent = () => {
  return (
    <section className='w-full  py-10 flex flex-col   items-center justify-center '>
 

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
