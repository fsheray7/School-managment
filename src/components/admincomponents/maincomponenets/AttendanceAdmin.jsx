import React from 'react'

const AttendanceAdmin = () => {
    return (
        <section className="flex flex-col items-center justify-start w-full bg-white min-h-screen gap-2 px-4 pb-10 pt-20">
            <div className='flex gap-6'>
                <button className='bg-[#0C46C4] text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-md'>Teacher Attendance</button>
                <button className='bg-[#0C46C4] text-white px-4 py-2 cursor-pointer hover:scale-105 transition-all duration-300 rounded-md'>Student Attendance</button>
            </div>
            <div className="flex flex-col items-center justify-start w-full bg-white min-h-screen gap-2 px-4 pb-10 pt-20">

            <h1 className="text-2xl font-bold text-[#0C46C4]">Attendance Management</h1>
            <p>Attendance list will appear here.</p>
            </div>
        </section>
    )
}

export default AttendanceAdmin