import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const ResultsStudent = () => {
  return (
    <section className="w-full bg-white flex flex-col items-center">



      <div className="w-full mt-32 flex flex-col md:flex-row lg:flex-row items-center justify-center gap-10 pb-10 px-4">

    <div className="w-full flex flex-col items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-xl gap-4">
        <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">First Terminal</h2>
        <input type="text " className="w-full px-4 outline-none py-3 bg-[#C4C4C4]" />
        
        <span className="w-full text-xl font-semibold  uppercase text-[#0C46C4]  py-3 flex items-center justify-end gap-2 hover:text-[#0a369e]">

          <Link to="/marks-student">View</Link>
        </span>

        </div>
    <div className="w-full flex flex-col  items-center justify-center p-4 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-lg gap-4">
        <h2 className="text-[#0C46C4] w-full flex items-center justify-start  font-bold text-xl ">Second Terminal</h2>
        <input type="text" className="w-full px-4 outline-none py-3 bg-[#C4C4C4]" />

        <span  className="w-full text-xl font-semibold  uppercase  text-[#0C46C4]  py-3 flex items-center justify-end gap-2 hover:text-[#0a369e]">

          <Link to="/marks-student">View</Link>
        </span>

        </div>

      </div>
    </section>
  );
};

export default ResultsStudent;
