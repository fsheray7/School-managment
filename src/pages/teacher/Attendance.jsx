import React, { useState, useEffect } from "react";
import studentsData from "../../data/admindata/students/students";
import Button from "../../components/ui/Button";

const Attendance = () => {
  const [teacherInfo, setTeacherInfo] = useState({ class: "", section: "" });
  const [attendanceDate, setAttendanceDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      // Use the teacher's primary class and section
      const teacherClass = teacherData.class || "";
      const teacherSection = teacherData.section || "";

      setTeacherInfo({ class: teacherClass, section: teacherSection });

      // Filter students automatically for this teacher's class
      if (teacherClass && teacherSection) {
        const filtered = studentsData.filter(
          (s) => s.class === teacherClass && s.section === teacherSection,
        );
        setFilteredStudents(filtered);

        // Initialize records
        const initialRecords = {};
        filtered.forEach((s) => {
          initialRecords[s.id] = "Present";
        });
        setAttendanceRecords(initialRecords);
      }
    }
  }, []);

  const handleAttendanceChange = (studentId, status) => {
    setAttendanceRecords((prev) => ({
      ...prev,
      [studentId]: status,
    }));
  };

  return (
    <section className="w-full mt-13 bg-white flex flex-col items-center">
      {/* CLASS AND DATE BAR (Classic Design) */}
      <div
        className="flex w-full items-center justify-between mt-4 py-3 px-4 shadow-sm"
        style={{ backgroundColor: "var(--primary-color)", opacity: 0.9 }}
      >
        <h2 className="text-sm sm:text-base text-white font-bold">
          Class:{" "}
          <span className="font-normal">
            {teacherInfo.class} - {teacherInfo.section}
          </span>
        </h2>
        <div className="flex items-center gap-2">
          <label className="text-white text-sm font-bold">Date:</label>
          <input
            type="date"
            value={attendanceDate}
            onChange={(e) => setAttendanceDate(e.target.value)}
            className="bg-transparent border-none outline-none text-white font-bold cursor-pointer text-sm sm:text-base [color-scheme:dark]"
          />
        </div>
      </div>

      {/* TABLE */}
      <div className="w-full mt-6 px-0 sm:px-4">
        {/* Header */}
        <div
          className="flex justify-between items-center border-b py-3 px-4 text-white text-xs sm:text-sm font-bold shadow-sm"
          style={{ backgroundColor: "var(--primary-color)", opacity: 0.9 }}
        >
          <div className="flex items-center gap-2">
            <p className="col-span-1">Roll No</p>
            <p className="col-span-3">Student Name</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="col-span-1 text-center">Present</p>
            <p className="col-span-1 text-center">Absent</p>
          </div>
        </div>

        {/* Rows */}
        {filteredStudents.length > 0 ? (
          filteredStudents.map((student) => (
            <div
              key={student.id}
              className="flex justify-between items-center border-b border-[#C4C4C4] py-3 mt-1 px-4 text-xs sm:text-sm hover:bg-gray-50 transition-all font-medium text-gray-700"
            >
              <div className="flex items-center gap-2">
                <p className="col-span-1">{student.rollNumber}:</p>
                <p className="col-span-3">{student.fullName}</p>
              </div>

              <div className="flex items-center gap-6">
                <input
                  type="radio"
                  name={`att-${student.id}`}
                  checked={attendanceRecords[student.id] === "Present"}
                  onChange={() => handleAttendanceChange(student.id, "Present")}
                  className="w-4 h-4 cursor-pointer accent-[var(--primary-color)]"
                />

                <input
                  type="radio"
                  name={`att-${student.id}`}
                  checked={attendanceRecords[student.id] === "Absent"}
                  onChange={() => handleAttendanceChange(student.id, "Absent")}
                  className="w-4 h-4 cursor-pointer accent-red-500"
                />
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center text-gray-400 font-medium">
            {teacherInfo.class
              ? `No students found for ${teacherInfo.class} - ${teacherInfo.section}.`
              : "Identifying your assigned class..."}
          </div>
        )}
      </div>

      {filteredStudents.length > 0 && (
        <div className="mt-10">
          <Button
            variant="primary"
            className="w-full py-2 shadow-md"
            onClick={() => console.log("Final Records:", attendanceRecords)}
          >
            Submit Attendance
          </Button>
        </div>
      )}
    </section>
  );
};

export default Attendance;
