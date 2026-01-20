import { FaArrowLeft } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ExamRoutine = () => {
  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center">

  {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <FaListCheck
            color="white"
            className=" w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Exam Routine
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



      <div className="w-full mt-32 flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 pb-10 px-4">

    <div className="w-full flex flex-col items-center justify-center p-20 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-xl gap-8">
        <h2 className="text-[#0C46C4] w-full   font-bold text-2xl ">Comming Soon !</h2>
       
        
       

        </div>
   

      </div>
    </section>
  );
};

export default ExamRoutine;
