import { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import QuizCard from "../cards/quizcards/QuizCards";
import  quizquestions  from "../../data/quizzes/historyquiz/quizoptions";
// import  quizquestions";
const QuizMultipleOptions = () => {
  const [visibleQuestions, setVisibleQuestions] = useState(10);
  const navigate = useNavigate();

  return (
    <section className=" w-full h-auto bg-white flex flex-col items-center">

  {/* NAV BAR */}
       <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
         <div className="flex items-center gap-3 w-full">
           <img
             src="/teachersection/eventswhite.png"
             alt="attendance icon"
             className="w-10 h-10 sm:w-12 sm:h-12"
           />
           <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
             Quiz
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

       
<div className=" w-full px-6 mt-34 bg-gray-100">
  <div className="
    grid 
    grid-cols-1 
    md:grid-cols-2 
    lg:grid-cols-2 
    gap-15 
    max-w-5xl  pb-10 mx-auto
  ">
    {quizquestions.slice(0, visibleQuestions).map((quiz) => (
      <QuizCard
        key={quiz.id}
        question={quiz.question}
        options={quiz.options}
      />
    ))}
  </div>
  {visibleQuestions < quizquestions.length && (
    <div className="flex justify-center mt-4 pb-10">
      <button
        onClick={() => setVisibleQuestions(quizquestions.length)}
        className="px-6 py-2 bg-[#0C46C4] text-white rounded-lg hover:bg-[#0A3A9A] transition-colors"
      >
        Show More
      </button>
    </div>
  )}
    <div className="flex justify-center mt-4 pb-10">
      <button
        onClick={() => navigate("/quiz-score")}
        className="px-6 py-2 bg-[#0C46C4] text-white rounded-lg hover:bg-[#0A3A9A] transition-colors"
      >
        Submit
      </button>
    </div>
</div>

    </section>
  );
};

export default QuizMultipleOptions;
