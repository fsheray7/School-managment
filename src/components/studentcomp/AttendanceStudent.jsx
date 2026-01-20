import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const students = [
  { id: 1, name: "Ali Khan" },
  { id: 2, name: "Ahmed Raza" },
  { id: 3, name: "Sara Khan" },
  { id: 4, name: "Fatima Bibi" },
  { id: 5, name: "Zain Malik" },
  { id: 6, name: "Usman Ghani" },
  { id: 7, name: "Ayesha Tariq" },
  { id: 8, name: "Bilal Ahmed" },
];

const AttendanceStudent = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden pb-6">

      {/* NAV BAR */}
    {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/attendancewhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase ">
            Attendance
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/student-dashboard"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>

    

      {/* TABLE */}
      <div className="w-full  mt-30 px-0 sm:px-4">
        {/* Header */}
        <div className="w-full flex items-center justify-between px-4 py-2 bg-[#0C46C4] rounded-t-lg">
          <h2 className="text-white text-lg sm:text-xl font-semibold">
            Attendance List
          </h2>
        </div>

          <div className="w-full mt-32 flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 pb-10 px-4">

    <div className="w-full flex flex-col items-center justify-center p-20 border-t-8 border-[#0C46C4] rounded-xl max-w-md shadow-xl gap-8">
        <h2 className="text-[#0C46C4] w-full   font-bold text-2xl ">Comming Soon !</h2>
       
        
       

        </div>
   

      </div>


      </div>

    </section>
  );
};

export default AttendanceStudent;
