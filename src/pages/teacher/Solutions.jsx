import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const Solutions = () => {
  return (
    <section className="w-full mt-20 bg-white flex flex-col items-center justify-center px-6 overflow-x-hidden ">
      <form
        action=""
        className="flex w-full px-4 jsutify-center  flex-col items-start gap-4 "
      >
        <div className="w-full gap-4 text-[#000000] flex flex-col">
          <h1 className="font-bold">Question #1</h1>
          <p>
            {" "}
            The standard Lorem Ipsum passage. "Lorem ipsum dolor sit amet,
            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
            labore et dolore magna aliqua?
          </p>
        </div>
        <h4 className="text-[#000000] text-base font-semibold sm:text-lg">
          Enter Details
        </h4>

        <textarea
          name="notice"
          id="notice"
          rows="8"
          className="w-full max-w-4xl border border-gray-300 rounded-lg p-3 text-sm sm:text-base focus:outline-none transition-all"
          placeholder="Write your notice or event details here..."
        ></textarea>

        <button
          className="px-4 py-2 rounded-lg text-white text-sm sm:text-base hover:brightness-90 transition-all active:scale-95"
          style={{ backgroundColor: "var(--primary-color)" }}
        >
          Upload File
        </button>
      </form>

      <button
        className="text-xl mt-6 w-full max-w-md text-white px-6 py-2 rounded-lg hover:brightness-90 transition-all active:scale-95 shadow-md"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        Send
      </button>
    </section>
  );
};

export default Solutions;
