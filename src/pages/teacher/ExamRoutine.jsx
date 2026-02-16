import { FaArrowLeft } from "react-icons/fa";
import { FaListCheck } from "react-icons/fa6";
import { Link } from "react-router-dom";

const ExamRoutine = () => {
  return (
    <section className="min-h-screen w-full bg-white flex flex-col items-center">
      <div className="w-full pt-2 flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 pb-10 px-4">
        <div
          className="w-full flex flex-col items-center justify-center p-20 border-t-8 rounded-xl max-w-md shadow-xl gap-8"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h2
            className="w-full font-bold text-2xl"
            style={{ color: "var(--primary-color)" }}
          >
            Comming Soon !
          </h2>
        </div>
      </div>
    </section>
  );
};

export default ExamRoutine;
