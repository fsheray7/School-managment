import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const Notice = () => {
  return (
    <section className="w-full mt-20 bg-white flex flex-col items-center justify-center px-6 py-1  ">

    <form
  action=""
  className="flex w-full px-4 flex-col items-start gap-2 "
>
  <h4 className="text-[#000000] text-base font-semibold sm:text-lg">Enter Details</h4>

  <textarea
    name="notice"
    id="notice"
    rows="8"
    className="w-full border-2 border-[#0C46C488] rounded-lg p-3 text-sm sm:text-base focus:outline-none "
    placeholder="Write your notice or event details here..."
  ></textarea>

  <button
    className="px-4 py-2 rounded-lg text-white bg-[#0C46C4] text-sm sm:text-base"
  >
    Upload image
  </button>
</form>


     <button className="text-xl  w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg mt-10 ">Send</button>

  

    </section>
  );
};

export default Notice;
