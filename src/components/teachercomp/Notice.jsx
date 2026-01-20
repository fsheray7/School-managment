import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";


const Notice = () => {
  return (
    <section className="w-full h-screen bg-white flex flex-col items-center justify-center px-2 overflow-x-hidden pb-6">

       {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/eventswhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Notice and Events
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/teacher-dashboard"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>


    

    <form
  action=""
  className="flex w-full px-4 max-w-4xl flex-col items-start gap-2 mt-24"
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


     <button className="text-xl mt-20 w-full max-w-md text-white bg-[#0C46C4] px-6 py-2 rounded-lg mt-6 ">Send</button>

  

    </section>
  );
};

export default Notice;
