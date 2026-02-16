import React, { useState, useEffect } from "react";
import studentsData from "../../data/admindata/students/students";
import Button from "../../components/ui/Button";
import Pagination from "../../components/ui/Pagination";
import CustomDropdown from "../../components/ui/CustomDropdown";
import DataTable from "../../components/ui/DataTable";
import {
  HiOutlineDocumentDownload,
  HiOutlineDocumentReport,
  HiOutlinePrinter,
  HiPlus,
} from "react-icons/hi";
import { IoSearchOutline, IoChevronDown } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

// Helper to generate mock attendance data for a month
// Helper to get real attendance data from localStorage
const getAttendanceData = (students, year, month) => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const records = {};
  const storedData = JSON.parse(localStorage.getItem("attendanceData")) || {};

  students.forEach((student) => {
    records[student.id] = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const dateObj = new Date(year, month, day);
      // Construct YYYY-MM-DD explicitly to avoid timezone issues
      const yearStr = dateObj.getFullYear();
      const monthStr = String(dateObj.getMonth() + 1).padStart(2, "0");
      const dayStr = String(dateObj.getDate()).padStart(2, "0");
      const dateString = `${yearStr}-${monthStr}-${dayStr}`;

      const dayOfWeek = dateObj.getDay();
      let status = "-";

      if (dayOfWeek === 0) {
        status = "Holiday";
      } else {
        // Check if data exists for this date and student
        if (storedData[dateString] && storedData[dateString][student.id]) {
          status = storedData[dateString][student.id];
        }
        // If not found, it remains "-" (Not Taken)
      }

      records[student.id].push({
        date: dateString,
        status,
      });
    }
  });

  return records;
};

// Helper to get weeks in a month
const getWeeksInMonth = (year, month) => {
  const weeks = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  let weekStart = firstDay;

  while (weekStart <= lastDay) {
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    weeks.push({
      start: new Date(weekStart),
      end: new Date(weekEnd > lastDay ? lastDay : weekEnd),
    });

    weekStart.setDate(weekStart.getDate() + 7);
  }

  return weeks.map((w, i) => {
    const startStr = w.start.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const endStr = w.end.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    return {
      label: `${startStr} - ${endStr}`,
      value: i,
      ...w,
    };
  });
};

const Attendance = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    fullName: "",
    class: "",
    section: "",
  });
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [weeks, setWeeks] = useState([]);
  const [selectedWeekIndex, setSelectedWeekIndex] = useState(0);

  // New States for Redesign
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Options for dropdowns
  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = new Date().getFullYear() - i;
    return { label: year.toString(), value: year };
  });

  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    label: new Date(0, i).toLocaleString("en-US", { month: "long" }),
    value: i,
  }));

  useEffect(() => {
    const storedTeacher = localStorage.getItem("currentTeacher");
    if (storedTeacher) {
      const teacherData = JSON.parse(storedTeacher);
      setTeacherInfo({
        fullName: teacherData.fullName || "Teacher",
        class: teacherData.class || "",
        section: teacherData.section || "",
      });

      if (teacherData.class && teacherData.section) {
        const filtered = studentsData.filter(
          (s) =>
            s.class === teacherData.class && s.section === teacherData.section,
        );
        setFilteredStudents(filtered);

        const realData = getAttendanceData(filtered, currentYear, currentMonth);
        setAttendanceData(realData);
      }
    }

    const monthWeeks = getWeeksInMonth(currentYear, currentMonth);
    setWeeks(monthWeeks);

    // Reset week index when month/year changes
    setSelectedWeekIndex(0);

    // Set default selected week to the current week if viewing current month/year
    const today = new Date();
    if (
      today.getFullYear() === currentYear &&
      today.getMonth() === currentMonth
    ) {
      const currentWeekIndex = monthWeeks.findIndex(
        (w) => today >= w.start && today <= w.end,
      );
      if (currentWeekIndex !== -1) {
        setSelectedWeekIndex(currentWeekIndex);
      }
    }
  }, [currentYear, currentMonth]);

  const selectedWeek = weeks[selectedWeekIndex];
  const daysInSelectedWeek = selectedWeek
    ? Array.from(
        {
          length: selectedWeek.end.getDate() - selectedWeek.start.getDate() + 1,
        },
        (_, i) => {
          const day = new Date(selectedWeek.start);
          day.setDate(day.getDate() + i);
          return day;
        },
      )
    : [];

  const navigate = useNavigate();

  const handlePrint = () => {
    window.print();
  };

  const handleExportExcel = () => {
    const headers = [
      "Roll #",
      "Student Name",
      ...daysInSelectedWeek.map((d) => d.toLocaleDateString()),
    ];
    const rows = filteredStudents.map((student) => {
      const attendance = daysInSelectedWeek.map((day) => {
        const dayString = day.toISOString().split("T")[0];
        const record = attendanceData[student.id]?.find(
          (r) => r.date === dayString,
        );
        return record ? record.status : "-";
      });
      return [student.rollNumber, student.fullName, ...attendance];
    });

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "weekly_attendance.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportPDF = () => {
    alert("Export PDF functionality would be implemented here.");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Present":
        return <span className="text-green-600 text-xs">P</span>;
      case "Absent":
        return <span className="text-red-500 text-xs">A</span>;
      case "Leave":
        return <span className="text-yellow-500 text-xs">L</span>;
      case "Holiday":
        return <span className="text-gray-400 font-bold">-</span>;
      default:
        return null;
    }
  };

  // Filter students based on search
  const displayedStudents = filteredStudents.filter((student) =>
    student.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Pagination logic
  const totalItems = displayedStudents.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedStudents = displayedStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getStatusContent = (status) => {
    switch (status) {
      case "Present":
        return <span className="text-green-600 font-bold text-sm ">P</span>;
      case "Absent":
        return <span className="text-red-500 font-bold text-sm">A</span>;
      case "Leave":
        return <span className="text-yellow-500 font-bold text-sm">L</span>;
      case "Holiday":
        return <span className="text-gray-400 font-bold text-lg">-</span>;
      default:
        return <span className="text-gray-300">-</span>;
    }
  };

  return (
    <div className="w-full bg-gray-50/50 min-h-screen p-6 font-sans">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-3">
          {/* Year Selector */}
          <div className="relative w-32">
            <CustomDropdown
              options={yearOptions.map((y) => y.label)}
              value={
                yearOptions.find((y) => y.value === currentYear)?.label || ""
              }
              onChange={(val) => {
                const selected = yearOptions.find((y) => y.label === val);
                if (selected) setCurrentYear(selected.value);
              }}
              triggerClassName=" border border-gray-200 rounded-md py-2.5"
            />
          </div>

          {/* Month Selector */}
          <div className="relative w-40">
            <CustomDropdown
              options={monthOptions.map((m) => m.label)}
              value={
                monthOptions.find((m) => m.value === currentMonth)?.label || ""
              }
              onChange={(val) => {
                const selected = monthOptions.find((m) => m.label === val);
                if (selected) setCurrentMonth(selected.value);
              }}
              triggerClassName="border border-gray-200 rounded-md py-2.5"
            />
          </div>

          {/* Week Selector */}
          <div className="relative min-w-[200px]">
            <CustomDropdown
              options={weeks.map((w) => w.label)}
              value={weeks[selectedWeekIndex]?.label || "Select Week"}
              onChange={(val) => {
                const idx = weeks.findIndex((w) => w.label === val);
                if (idx !== -1) setSelectedWeekIndex(idx);
              }}
              triggerClassName="border border-gray-200 rounded-md py-2.5"
            />
          </div>
        </div>
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleExportPDF}
            className="flex items-center gap-2 !py-2 !px-3 font-medium text-gray-700 border-gray-300 rounded-md bg-white hover:bg-gray-50 shadow-sm"
          >
            <HiOutlineDocumentDownload className="text-lg" />
            <span className="hidden sm:inline">Export PDF</span>
          </Button>

          <Button
            variant="primary"
            onClick={handleExportExcel}
            className="flex items-center gap-2 !py-2 !px-3 font-medium bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            <HiOutlineDocumentReport className="text-lg" />
            <span className="hidden sm:inline">Export Excel</span>
          </Button>
        </div>
      </div>

      {/* Filters & Actions Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-6 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
        {/* Class Info (Read-only for now based on teacher) */}
        <div className="md:col-span-3 flex gap-4">
          <div className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-2  rounded-lg flex-1 flex items-center justify-between">
            <span>{teacherInfo.class || "Class"}</span>
          </div>
          <div className="bg-gray-50 border border-gray-200 text-gray-700 text-sm font-medium px-2 py-1.5 rounded-lg flex-1 flex items-center justify-between">
            <span>{teacherInfo.section || "Sec"}</span>
          </div>
        </div>

        {/* Search */}
        <div className="md:col-span-4 relative">
          <IoSearchOutline className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          <input
            type="text"
            placeholder="Search student..."
            className="w-full pl-10 pr-4 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Extra Actions */}
        <div className="md:col-span-5 flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={handlePrint}
            className="flex items-center gap-2 !text-gray-600 border-gray-200 hover:bg-gray-50"
          >
            <HiOutlinePrinter className="text-lg" />
            <span>Print</span>
          </Button>
          <Button
            className="flex items-center py-1.5 "
            variant="primary"
            onClick={() => navigate("/add-attendance")}
          >
            <HiPlus className="text-lg" />
            <span>Attendance</span>
          </Button>
        </div>
      </div>

      {/* Attendance Table */}
      <DataTable
        columns={[
          {
            header: "Roll #",
            key: "rollNumber",
            className: "w-24",
          },
          {
            header: "Student Name",
            key: "fullName",
            render: (student) => (
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
                  {student.fullName}
                </span>
              </div>
            ),
          },
          ...daysInSelectedWeek.map((day) => {
            const yearStr = day.getFullYear();
            const monthStr = String(day.getMonth() + 1).padStart(2, "0");
            const dayStr = String(day.getDate()).padStart(2, "0");
            const dateString = `${yearStr}-${monthStr}-${dayStr}`;

            return {
              header: (
                <div className="flex flex-col items-center">
                  <span className="text-xs uppercase text-gray-400 mb-1">
                    {day.toLocaleDateString("en-US", { weekday: "short" })}
                  </span>
                  <span className="text-sm font-bold text-gray-800">
                    {day.getDate()}
                  </span>
                </div>
              ),
              key: `date-${dateString}`, // Unique key for internal column logic if needed
              render: (student) => {
                const record = attendanceData[student.id]?.find(
                  (r) => r.date === dateString,
                );
                return (
                  <div className="text-center">
                    {record ? (
                      getStatusContent(record.status)
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </div>
                );
              },
            };
          }),
        ]}
        data={paginatedStudents}
        emptyMessage="No students found matching your search."
        renderMobileCard={(student) => (
          <div className="p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                {student.profileImage ? (
                  <img
                    src={student.profileImage}
                    alt={student.fullName}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  student.fullName[0]
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">
                  {student.fullName}
                </h4>
                <p className="text-xs text-gray-500">
                  Roll: {student.rollNumber}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-2">
              {daysInSelectedWeek.map((day, i) => {
                const yearStr = day.getFullYear();
                const monthStr = String(day.getMonth() + 1).padStart(2, "0");
                const dayStr = String(day.getDate()).padStart(2, "0");
                const dateString = `${yearStr}-${monthStr}-${dayStr}`;
                const record = attendanceData[student.id]?.find(
                  (r) => r.date === dateString,
                );

                return (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-gray-50 p-2 rounded"
                  >
                    <span className=" text-gray-400 mb-1">
                      {day.getDate()}
                    </span>
                    {record ? (
                      getStatusIcon(record.status)
                    ) : (
                      <span className="text-gray-300">-</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      />

      {/* Footer / Pagination */}
      <div className="border-t border-gray-200 bg-gray-50 p-4 flex flex-col md:flex-row justify-between items-center gap-4 mt-4 rounded-b-xl">
        {/* Legend */}
        <div className="flex flex-wrap gap-4 text-xs font-medium text-gray-600">
          <div className="flex items-center gap-1.5">
            <span className="text-green-600 font-bold text-sm">P</span> :
            Present
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-red-500 font-bold text-sm">A</span> : Absent
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 font-bold text-sm">L</span> : Leave
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-gray-400 font-bold text-sm">-</span> : Holiday
          </div>
        </div>

        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          showInfo={true}
        />
      </div>
      <div className="flex justify-start mt-6">
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Show</span>
          <CustomDropdown
            options={["10", "20", "50"]}
            value={itemsPerPage.toString()}
            onChange={(val) => setItemsPerPage(Number(val))}
            containerClassName="w-20"
            triggerClassName="py-1.5 border border-gray-200 rounded-md text-sm h-9"
          />
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
