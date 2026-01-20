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

const AddMarks = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden pb-6">

      {/* NAV BAR */}
      <nav className="w-full flex items-center px-4 py-3 fixed top-0 gap-2 bg-[#0C46C4] z-20">
        <div className="flex items-center gap-3 w-full">
          <img
            src="/teachersection/attendancewhite.png"
            alt="attendance icon"
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h1 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase font-bold">
            Add Marks
          </h1>
        </div>

        <div className="flex items-center">
          <Link
            to="/results"
            className="p-2 rounded-full bg-[#28C2A0] hover:bg-[#22a688]"
          >
            <FaArrowLeft className="text-white text-lg" />
          </Link>
        </div>
      </nav>

      {/* CLASS AND DATE BAR */}
      <div className="flex w-full items-center justify-between bg-[#0C46C499] mt-16 py-2 px-4">
        <h2 className="text-sm sm:text-base text-white font-semibold">
          Class: <span className="font-none">3 A</span>
        </h2>
        <h2 className="text-sm sm:text-base  text-white font-semibold">
          Date: <span className="font-bold">12/12/21</span>
        </h2>
      </div>

    {/* TABLE */}
<div className="w-full mt-8 px-0 sm:px-4">
  {/* Header */}
  <div className="flex items-center justify-between border-b bg-[#0C46C499] py-2 px-6 text-white text-xs sm:text-sm font-bold">
    <p>Student Name</p>
    <p className="text-center">Marks</p>
  </div>

  {/* Rows */}
  {students.map((student) => (
    <div
      key={student.id}
      className="flex items-center justify-between border-b border-[#C4C4C4] py-2 px-6 text-xs sm:text-sm"
    >
      <p className="whitespace-nowrap text-[#000000] font-medium">{student.name}</p>

      <input
        type="text"
        className="w-12 h-6 border border-[#28C2A0] text-center outline-none"
      />
    </div>
  ))}
</div>

  <footer className="w-full mt-6 px-4 py-3 bg-[#0C46C4] flex items-center fixed bottom-0 justify-between text-white text-sm sm:text-base font-semibold">
    
      <h3>Subject</h3>
      <h3>Class</h3>
  </footer>

    </section>
  );
};

export default AddMarks;
