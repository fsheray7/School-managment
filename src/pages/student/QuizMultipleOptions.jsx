import { useState } from "react";
import { useNavigate } from "react-router-dom";
import QuizCard from "../../components/cards/quizcards/QuizCards";
import Button from "../../components/ui/Button"
import  quizquestions  from "../../data/quizzes/historyquiz/quizoptions";
// import  quizquestions";
const QuizMultipleOptions = () => {
  const [visibleQuestions, setVisibleQuestions] = useState(10);
  const navigate = useNavigate();

  return (
    <section className=" w-full   bg-white flex flex-col items-center">


       
<div className=" w-full pt-6 px-4 bg-gray-100">
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
      <Button
        onClick={() => setVisibleQuestions(quizquestions.length)}
        variant="primary"
      >
        Show More
      </Button>
    </div>
  )}
    <div className="flex justify-center mt-4 pb-10">
      <Button
        onClick={() => navigate("/quiz-score")}
        variant="primary"
      >
        Submit
      </Button>
    </div>
</div>

    </section>
  );
};

export default QuizMultipleOptions;
