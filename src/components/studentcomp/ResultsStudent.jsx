import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResultsStudent = () => {
  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center">

  <nav className='w-full flex items-center px-4 fixed top-0 gap-2 bg-[#0C46C4] justify-start z-20'>
    <div className="flex items-center gap-2 w-full">

            <img src="/teachersection/resultswhite.png" alt="homework  icon" className='p-2 text-white w-20 h-20' />

            <h1 className='text-2xl md:text-4xl lg:text-4xl uppercase text-[#FFFFFF] '>Results</h1>
    </div>
    <div className=" flex items-center justify-end  ">
      <Link to="/student-dashboard"  className=" p-3 rounded-full  bg-[#28C2A0] hover:p-[13px]" > <FaArrowLeft  className="text-white text-xl "/> </Link>
    </div>
        </nav>


      <div className="w-full mt-32 flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10 pb-10 px-4">

    <div className="w-full flex flex-col items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-xl gap-4">
        <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">First Terminal</h2>
        <input type="text " className="w-full px-4 outline-none py-3 bg-[#C4C4C4]" />
        
        <span className="w-full text-xl font-semibold  uppercase text-[#0C46C4]  py-3 flex items-center justify-end gap-2 hover:text-[#0a369e]">

          <Link to="/marks-student">View</Link>
        </span>

        </div>
    <div className="w-full flex flex-col  items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-lg gap-4">
        <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">Second Terminal</h2>
        <input type="text" className="w-full px-4 outline-none py-3 bg-[#C4C4C4]" />

        <span  className="w-full text-xl font-semibold  uppercase  text-[#0C46C4]  py-3 flex items-center justify-end gap-2 hover:text-[#0a369e]">

          <Link to="/marks-student">View</Link>
        </span>

        </div>

      </div>
    </section>
  );
};

export default ResultsStudent;
