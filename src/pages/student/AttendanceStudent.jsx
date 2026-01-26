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
    <section className="w-full bg-white flex flex-col items-center overflow-x-hidden pb-6">


    

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
