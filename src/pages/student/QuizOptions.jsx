import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const QuizOption = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center justify-center px-2 overflow-x-hidden ">


           
  <div className="w-full mt-20  flex flex-col items-center justify-center px-4">

  {/* Question */}
  <h2 className="text-2xl sm:text-3xl lg:text-4xl text-[#0C46C4] font-bold text-center ">
    Who was the first president of Pakistan?
  </h2>

  {/* Options */}
  <div className="grid mt-15  grid-cols-1 md:grid-cols-2 gap-6 w-full px-8 max-w-3xl">

    <button className="text-lg sm:text-xl text-white bg-[#0C46C4] py-3 rounded-xl w-full  cursor-pointer">
      Major General Iskander Mirza
    </button>

    <button className="text-lg sm:text-xl text-white bg-[#0C46C4] py-3 rounded-xl w-full cursor-pointer">
      Major General Iskander Mirza
    </button>

    <button className="text-lg sm:text-xl text-white bg-[#0C46C4] py-3 rounded-xl w-full cursor-pointer">
      Major General Iskander Mirza
    </button>

    <button className="text-lg sm:text-xl text-white bg-[#0C46C4] py-3 rounded-xl w-full cursor-pointer">
      Major General Iskander Mirza
    </button>

  </div>


  <div className="w-full flex items-center justify-center mt-14 max-w-2xl px-10">
     <Link to="/quiz-multiple-options" className="text-lg sm:text-xl text-center text-white bg-[#28C2A0] px-4 py-3 rounded-xl w-full cursor-pointer">
      See More Questions
    </Link>
  </div>
</div>

  

    </section>
  );
};

export default QuizOption;
