import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";



const MarksStudent = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center overflow-x-hidden pb-6">



      {/* CLASS AND DATE BAR */}
      <div className="flex w-full items-center justify-between bg-[#0C46C499] mt-16 py-2 px-4">
        <h2 className="text-sm sm:text-base text-white font-semibold">
          Term: <span className="font-none">First</span>
        </h2>
        <h2 className="text-sm sm:text-base  text-white font-semibold">
          Date: <span className="font-bold">12/12/21</span>
        </h2>
      </div>

   <form action="" className='w-full flex flex-col max-w-2xl  items-center justify-center px-8 mt-30 md:mt-20 gap-6 '>
        <div className='  flex flex-col items-satrt justify-start gap-4 '>
            <h1 className=' text-2xl  font-semibold'>Description</h1>
            <p>
The standard Lorem Ipsum passage.
"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? </p>
        </div>

        <div className='flex w-full  space-y-2  flex-col'>
            <input type="text" className=' w-full outline-none  border-2 w-10 h-40 py-2 bg-[#C4C4C4]  rounded'  />
        </div>

        <button className=' mt-6   text-[#FFFFFF] text-xl  px-35 md:px- py-3 rounded-md bg-[#0C46C4]'>Download your result</button>
    </form>
 

 

    </section>
  );
};

export default MarksStudent;
