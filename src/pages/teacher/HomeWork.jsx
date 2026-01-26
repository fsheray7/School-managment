import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const HomeWork = () => {
  return (
    <section className='w-full   mt-20  flex flex-col   items-center justify-center gap-10'>
  

    <form action="" className='w-full flex flex-col  items-center justify-center px-8  gap-6 '>
        <div className=' px-10 flex flex-col items-center justify-center gap-4 text-center'>
            <h1 className=' text-2xl text-[#0C46C4] font-semibold'>Subject</h1>
        </div>

        <div className='flex w-full max-w-2xl space-y-2  flex-col'>
            <label className='text-xl'>Add Homework</label>
            <input type="text" className=' w-full outline-none  border-2 border-[#0C46C4] py-2  rounded'  />
        </div>

        <button className=' mt-6 w-full   text-[#FFFFFF]  max-w-lg py-3 rounded-md bg-[#0C46C4]'>Submit</button>
    </form>

    <p className='text-[#0C46C4] mt-4'>File is uploaded sucessfully</p>
      
    </section>
  )
}

export default HomeWork
