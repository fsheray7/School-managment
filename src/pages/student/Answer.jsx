import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Answer = () => {
  const navigate = useNavigate();
  return (
    <section className="w-full  bg-white flex flex-col items-center justify-center gap-10 px-8  pb-6">
    

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
