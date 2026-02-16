import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const ResultsStudent = () => {
  const navigate = useNavigate();

  const handleViewResult = (terminal) => {
    navigate("/marks-student", { state: { terminal } });
  };

  return (
    <section className="w-full pt-10 bg-white flex flex-col items-center min-h-screen px-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* First Terminal Card */}
        <div
          className="w-full flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
          onClick={() => handleViewResult("First Terminal")}
        >
          <div className="h-2 bg-blue-600 w-full group-hover:h-3 transition-all"></div>
          <div className="p-8 flex flex-col gap-4 items-center text-center">
            <div className="p-4 bg-blue-50 rounded-full text-blue-600 mb-2">
              <FaFileAlt size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                First Terminal
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View your detailed marks sheet
              </p>
            </div>
            <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors">
              View Result
            </button>
          </div>
        </div>

        {/* Second Terminal Card */}
        <div
          className="w-full flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
          onClick={() => handleViewResult("Second Terminal")}
        >
          <div className="h-2 bg-purple-600 w-full group-hover:h-3 transition-all"></div>
          <div className="p-8 flex flex-col gap-4 items-center text-center">
            <div className="p-4 bg-purple-50 rounded-full text-purple-600 mb-2">
              <FaFileAlt size={32} />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                Second Terminal
              </h2>
              <p className="text-gray-500 text-sm mt-1">
                View your detailed marks sheet
              </p>
            </div>
            <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-700 transition-colors">
              View Result
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultsStudent;
