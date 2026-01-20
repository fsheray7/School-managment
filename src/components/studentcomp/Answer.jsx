import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Answer = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full  bg-white flex flex-col items-center justify-center gap-10 px-8 overflow-x-hidden pb-6">
      {/* NAV BAR */}
      {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/solutionwhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Answer
          </h1>
        </div>

        <div className="flex items-center">
          <button onClick={() => navigate("/questions")}
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </button>
        </div>
      </nav>

      <div className="flex w-full px-4 mt-20 items-start justify-start">
        <h1 className="text-[#0C46C4] font-semibold text-xl" >Subject</h1>
      </div>

      <div className="w-full gap-4 text-[#000000] flex flex-col px-4 ">
        <h1 className="font-bold">Question #1</h1>
        <p>
          The standard Lorem Ipsum passage. "Lorem ipsum dolor sit amet,
          consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
          labore et dolore magna aliqua?{" "}
        </p>

        <hr className="w-full" />
        <p >The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? The standard Lorem Ipsum passage.
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua? </p>

      </div>

      <button className="text-xl mt-20 w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg mt-4 ">
        Download Answer
      </button>
    </section>
  );
};

export default Answer;
