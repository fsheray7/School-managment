import React, { useState, useEffect } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationCircle,
  FaUserClock,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

const AttendanceStudent = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    leave: 0,
    total: 0,
  });

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const studentData = JSON.parse(storedStudent);
      setStudent(studentData);

      // Fetch Attendance Data
      // attendanceData structure expected: { "YYYY-MM-DD": { "studentId": "status" }, ... }
      const allAttendance =
        JSON.parse(localStorage.getItem("attendanceData")) || {};

      const records = [];
      let presentCount = 0;
      let absentCount = 0;
      let leaveCount = 0;

      // Iterate through dates
      Object.keys(allAttendance).forEach((date) => {
        const dayRecord = allAttendance[date];
        // Check if this student has a record for this date
        if (dayRecord && dayRecord[studentData.id]) {
          const status = dayRecord[studentData.id];
          records.push({ date, status });

          if (status === "Present") presentCount++;
          else if (status === "Absent") absentCount++;
          else if (status === "Leave") leaveCount++;
        }
      });

      // Sort by date descending
      records.sort((a, b) => new Date(b.date) - new Date(a.date));

      setAttendanceRecords(records);
      setStats({
        present: presentCount,
        absent: absentCount,
        leave: leaveCount,
        total: records.length,
      });
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!student) return null;

  const chartData = [
    { name: "Present", value: stats.present, color: "#22c55e" }, // Green
    { name: "Absent", value: stats.absent, color: "#ef4444" }, // Red
    { name: "Leave", value: stats.leave, color: "#eab308" }, // Yellow
  ];

  // Helper for status styling
  const getStatusStyle = (status) => {
    switch (status) {
      case "Present":
        return { color: "green", icon: <FaCheckCircle /> };
      case "Absent":
        return { color: "red", icon: <FaTimesCircle /> };
      case "Leave":
        return { color: "orange", icon: <FaExclamationCircle /> };
      default:
        return { color: "gray", icon: <FaUserClock /> };
    }
  };

  return (
    <section className="w-full bg-[#f3f4f6] min-h-screen pt-6 px-4 pb-10 flex flex-col items-center gap-6">
      {/* Header Card */}
      <div className="w-full max-w-5xl bg-white rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Attendance Record
          </h1>
          <p className="text-gray-500">
            Overview for{" "}
            <span className="font-semibold text-blue-600">
              {student.fullName}
            </span>
          </p>
        </div>
        <div className="flex gap-4 text-sm font-bold">
          <div className="px-4 py-2 bg-green-50 text-green-700 gap-2 rounded-xl border border-green-100 flex items-center">
            <span className="text-xl">{stats.present}</span>
            <span className="text-[10px] uppercase">Present</span>
          </div>
          <div className="px-4 py-2 bg-red-50 text-red-700 gap-2 rounded-xl border border-red-100 flex items-center">
            <span className="text-xl">{stats.absent}</span>
            <span className="text-[10px] uppercase">Absent</span>
          </div>
          <div className="px-4 py-2 bg-yellow-50 text-yellow-700 gap-2 rounded-xl border border-yellow-100 flex items-center">
            <span className="text-xl">{stats.leave}</span>
            <span className="text-[10px] uppercase">Leave</span>
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Chart Section */}
        <div className="bg-white rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center min-h-[300px]">
          <h3 className="text-lg font-bold text-gray-700 mb-4">
            Summary Chart
          </h3>
          {stats.total > 0 ? (
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex flex-col items-center text-gray-400">
              <FaUserClock size={48} className="mb-2 opacity-50" />
              <p>No attendance records found.</p>
            </div>
          )}
        </div>

        {/* List Section */}
        <div className="md:col-span-2 bg-white rounded-3xl p-6 shadow-sm flex flex-col gap-4">
          <h3 className="text-lg font-bold text-gray-700 mb-2">
            Daily History
          </h3>
          <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
            {attendanceRecords.length === 0 ? (
              <p className="text-center text-gray-400 py-10">
                No attendance records found.
              </p>
            ) : (
              attendanceRecords.map((record, index) => {
                const style = getStatusStyle(record.status);
                return (
                  <div
                    key={index}
                    className="flex justify-between items-center p-4 bg-gray-50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-full bg-white shadow-sm text-${style.color}-500`}
                      >
                        {style.icon}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">
                          {new Date(record.date).toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-xs text-gray-400 font-mono">
                          {record.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-lg text-xs font-bold uppercase bg-${style.color}-100 text-${style.color}-600`}
                    >
                      {record.status}
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AttendanceStudent;
