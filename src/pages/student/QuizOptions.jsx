import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button"


const QuizOption = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center justify-center pt-4 px-2 ">


           
  <div className="w-full   flex flex-col items-center justify-center px-4">

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


  <Button 
  variant="primary" 
  className="mt-6">
     <Link to="/quiz-multiple-options">
      See More Questions
    </Link>
  </Button>
</div>

  

    </section>
  );
};

export default QuizOption;
