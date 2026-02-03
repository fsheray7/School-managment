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

const Attendance = () => {
  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center overflow-x-hidden pb-6">
      {/* CLASS AND DATE BAR */}
      <div
        className="flex w-full items-center justify-between mt-16 py-2 px-4 shadow-sm"
        style={{ backgroundColor: "var(--primary-color)", opacity: 0.6 }}
      >
        <h2 className="text-sm sm:text-base text-white font-semibold">
          Class: <span className="font-none">3 A</span>
        </h2>
        <h2 className="text-sm sm:text-base  text-white font-semibold">
          Date: <span className="font-bold">12/12/21</span>
        </h2>
      </div>

      {/* TABLE */}
      <div className="w-full  mt-8 px-0 sm:px-4">
        {/* Header */}
        <div
          className="grid grid-cols-3 border-b py-2 px-2 text-white text-xs sm:text-sm font-bold shadow-sm"
          style={{ backgroundColor: "var(--primary-color)", opacity: 0.6 }}
        >
          <p>Student Name</p>
          <p className="text-center">Present</p>
          <p className="text-center">Absent</p>
        </div>

        {/* Rows */}
        {students.map((student) => (
          <div
            key={student.id}
            className="grid grid-cols-3 items-center border-b border-[#C4C4C4] py-2 mt-2 px-2 text-xs sm:text-sm"
          >
            <p>{student.name}</p>

            <div className="flex justify-center">
              <input type="checkbox" className="w-4 h-4" />
            </div>

            <div className="flex justify-center">
              <input type="checkbox" className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Attendance;
