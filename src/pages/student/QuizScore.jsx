import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const QuizScore = () => {
  return (
    <section className="w-full  bg-white flex flex-col items-center justify-center px-2 mt-10">
      <div className="w-full mt-10  flex flex-col items-center justify-center px-4">
        {/* Question */}
        <h2
          className="text-4xl sm:text-3xl lg:text-5xl font-bold text-center"
          style={{ color: "var(--primary-color)" }}
        >
          Score
        </h2>

        {/* Options */}
        <div className="flex flex-col items-center justify-center mt-14  gap-4 text-3xl  font-bold w-full px-8 max-w-3xl">
          <p>
            Score: <span>4</span>
          </p>
          <p>
            Total: <span>5</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default QuizScore;
