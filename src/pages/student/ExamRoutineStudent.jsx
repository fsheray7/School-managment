import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ExamRoutineStudent = () => {
  return (
    <section className="w-full pt-4 bg-white flex flex-col items-center">
      <div>
        <div
          className="w-full flex flex-col items-center justify-center p-10 border-t-8 rounded-xl max-w-md shadow-xl gap-8"
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

export default ExamRoutineStudent;
