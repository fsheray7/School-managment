import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const QuizScore = () => {
  return (
    <section className="w-full h-screen bg-white flex flex-col items-center justify-center px-2 overflow-x-hidden pb-6">

     
      {/* NAV BAR */}
           <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
             <div className="flex items-center gap-3 w-full">
               <img
                 src="/teachersection/eventswhite.png"
                 alt="attendance icon"
                 className="w-10 h-10 sm:w-12 sm:h-12"
               />
               <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
                 Ask Question
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

           
  <div className="w-full mt-10  flex flex-col items-center justify-center px-4">

  {/* Question */}
  <h2 className="text-4xl sm:text-3xl lg:text-5xl text-[#0C46C4] font-bold text-center ">
    Score
  </h2>

  {/* Options */}
  <div className="flex flex-col items-center justify-center mt-14  gap-4 text-3xl  font-bold w-full px-8 max-w-3xl">

   <p>Score: <span>4</span></p>
   <p>Total: <span>5</span></p>

  </div>


 
</div>

  

    </section>
  );
};

export default QuizScore;
