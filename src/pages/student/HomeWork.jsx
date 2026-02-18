import React, { useState, useEffect } from "react";
import {
  FaBook,
  FaDownload,
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import Button from "../../components/ui/Button";
import HomeworkPreviewModal from "../../components/ui/HomeworkPreviewModal";
import Pagination from "../../components/ui/Pagination";

const HomeWorkStudent = () => {
  const [homeworkList, setHomeworkList] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedHomework, setSelectedHomework] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");

    if (storedStudent) {
      const studentData = JSON.parse(storedStudent);
      setStudent(studentData);

      const allHomework =
        JSON.parse(localStorage.getItem("homeworkData")) || [];

      const relevantHomework = allHomework.filter(
        (hw) =>
          hw.class === studentData.class && hw.section === studentData.section,
      );

      relevantHomework.sort((a, b) => new Date(b.date) - new Date(a.date));
      setHomeworkList(relevantHomework);
    }
  }, []);

  const handleDownload = (hw) => {
    if (!hw.file) return;

    const link = document.createElement("a");
    link.href = hw.file;
    link.download = hw.fileName || `Homework-${hw.subject}-${hw.date}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleView = (hw) => {
    setSelectedHomework(hw);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedHomework(null);
  };

  // Pagination Logic
  const totalPages = Math.ceil(homeworkList.length / itemsPerPage);
  const paginatedHomework = homeworkList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  if (!student) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-gray-500">
        Loading student profile...
      </div>
    );
  }

  return (
    <section className="w-full pt-4 flex flex-col mt-5 items-center gap-6 px-4 pb-10">
      {homeworkList.length === 0 ? (
        <div className="w-full max-w-2xl bg-gray-50 border border-gray-200 rounded-xl p-10 flex flex-col items-center justify-center text-gray-400 gap-4">
          <FaBook size={48} className="opacity-20" />
          <p>No homework assigned yet.</p>
        </div>
      ) : (
        <>
          <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
            {paginatedHomework.map((hw) => (
              <div
                key={hw.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col gap-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                      <span className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                        <FaBook size={14} />
                      </span>
                      {hw.subject}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500 font-medium ml-1">
                      <span className="flex items-center gap-1">
                        <FaChalkboardTeacher /> {hw.teacherName}
                      </span>
                      <span className="flex items-center gap-1">
                        <FaCalendarAlt /> {hw.date}
                      </span>
                    </div>
                  </div>
                  {hw.file && (
                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                      File Attached
                    </span>
                  )}
                </div>

                <div className="bg-gray-50 rounded-xl p-4 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap line-clamp-3">
                  {hw.description || "No description provided."}
                </div>

                <div className="mt-auto pt-2 flex gap-3">
                  <Button
                    onClick={() => handleView(hw)}
                    variant="ghost"
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-50 text-blue-600 hover:bg-blue-100 border-none px-4"
                  >
                    <FaEye /> View
                  </Button>

                  {hw.file && (
                    <Button
                      onClick={() => handleDownload(hw)}
                      variant="ghost"
                      className="flex-1 flex items-center justify-center gap-2 border border-gray-200 hover:bg-gray-50 text-gray-700 px-4"
                    >
                      <FaDownload /> Download
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              totalItems={homeworkList.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}

      <HomeworkPreviewModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        homework={selectedHomework}
      />
    </section>
  );
};

export default HomeWorkStudent;
