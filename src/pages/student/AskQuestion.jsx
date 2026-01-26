import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const AskQuestion = () => {
  return (
    <section className="w-full h-screen bg-white flex flex-col items-center justify-center px-2 overflow-x-hidden pb-6">


    

    <form
  action=""
  className="flex w-full px-4 jsutify-center max-w-5xl  flex-col   gap-4 lg:mt-20"
>
  <div className="flex w-full px-4 jsutify-center  flex-col items-start  gap-4 ">

  <h4 className="  text-[#000000] text-base font-semibold sm:text-lg">Ask your Question below</h4>

  <textarea
    name="notice"
    id="notice"
    rows="8"
    className="w-full max-w-4xl border-2 border-[#0C46C488] rounded-lg p-3 text-sm sm:text-base focus:outline-none "
    placeholder="Write your notice or event details here..."
  ></textarea>

  <button
    className="px-4 py-2 rounded-lg text-white bg-[#0C46C4] text-sm sm:text-base"
    >
    Upload File
  </button>
    </div>
</form>


     <button className="text-xl mt-20 w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg mt-4 ">Ask Question</button>

  

    </section>
  );
};

export default AskQuestion;
