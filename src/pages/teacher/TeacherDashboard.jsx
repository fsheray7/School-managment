import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaTrophy,
  FaChevronRight,
  FaClipboardCheck,
  FaUserTimes,
  FaUserCheck,
  FaBookOpen,
} from "react-icons/fa";
import { IoNotifications, IoSchool } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import teachersData from "../../data/teachers/teacher";
import studentsData from "../../data/admindata/students/students";
import classesData from "../../data/admindata/classes";
import coursesData from "../../data/admindata/courses";
import { UPCOMING_EVENTS, CIRCULARS } from "../../data/admindata/dashboardData";

import { useTeacher } from "../../context/TeacherContext";
import { getNoticesForUser } from "../../utils/noticeManager";
import NoticePreviewModal from "../../components/common/NoticePreviewModal";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { currentTeacher: teacher } = useTeacher();
  const [myClass, setMyClass] = useState(null);
  const [stats, setStats] = useState({
    present: 0,
    absent: 0,
    pendingHomework: 1,
    papersToCheck: 15,
  });
  const [notices, setNotices] = useState([]);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    if (teacher) {
      // Refresh teacher data from the source to get latest profileImage
      const updatedTeacher =
        teachersData.find((t) => t.id === teacher.id) || teacher;

      // Find the class where this teacher is the Class Teacher
      const assignedClass = classesData.find(
        (c) => c.classTeacher === updatedTeacher.fullName,
      );

      if (assignedClass) {
        setMyClass(assignedClass);
        const total = assignedClass.totalStudents;
        // Simulate some stats
        setStats({
          present: Math.floor(total * 0.9),
          absent: total - Math.floor(total * 0.9),
          pendingHomework: 1,
          papersToCheck: 15,
        });
      }

      // Load notices
      const teacherNotices = getNoticesForUser("teacher");
      setNotices(teacherNotices.slice(0, 5));

      // Show welcome toast
      setShowWelcome(true);
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [navigate, teacher]);

  const handleNoticeClick = (notice) => {
    setSelectedNotice(notice);
    setIsModalOpen(true);
  };

  if (!teacher) return null;

  return (
    <section className="flex flex-col w-full  overflow-y-auto  pb-10 pt-4 gap-4">
      {/* Welcome Banner */}
      <div className="relative">
        {showWelcome ? (
          <div className="relative w-full bg-blue-600 rounded-3xl p-6 md:p-8 flex items-center justify-between text-white shadow-xl animate-fade-in-down transition-all duration-500 overflow-hidden">
            <div className="flex flex-col gap-1 z-10">
              <h2 className="text-xl sm:text-2xl font-black flex items-center gap-3">
                Welcome back, {teacher.fullName.split(" ")[0]}!
                <span className="animate-bounce">👋</span>
              </h2>
              <p className="text-blue-100 text-xs sm:text-sm font-medium tracking-wide">
                Ready to inspire your students today?
              </p>
            </div>
            <div className="hidden sm:block opacity-20 transform rotate-12 -mr-8 text-white">
              <FaTrophy size={120} />
            </div>
            {/* Dynamic background pulse */}
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          </div>
        ) : (
          <div className="relative w-full bg-gradient-to-r from-[#e0f2fe] to-[#f0f9ff] rounded-3xl p-4 md:p-8 shadow-sm border border-blue-50 flex items-center justify-between overflow-hidden animate-fade-in transition-all duration-500">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-20%] left-[-5%] w-64 h-64 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
            <div className="absolute bottom-[-10%] right-[10%] w-48 h-48 bg-blue-200 rounded-full opacity-30 blur-2xl"></div>

            <div className="z-10 max-w-2xl">
              <h1 className="text-lg md:text-2xl font-bold text-[#1e293b] mb-4">
                Welcome, {teacher.fullName}!
              </h1>
              <p className="text-[#64748b] text-xs md:text-base sm:text-lg leading-relaxed max-w-lg">
                "Education is the most powerful weapon which you can use to
                change the world." Manage your classes and stay updated with
                school activities.
              </p>
            </div>

            <div className="hidden lg:block z-10">
              <div className="relative">
                <div className="w-48 h-48 rounded-full border-8 border-white shadow-xl overflow-hidden bg-white">
                  <img
                    src={teacher.profileImage}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Decorative element around image */}
                <div className="absolute inset-[-10px] rounded-full border-2 border-blue-100 opacity-50"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-2 w-full">
        {/* Middle Section: Overview & Circulars */}
        <div className="xl:col-span-2 flex flex-col gap-2">
          {/* Today's Overview */}
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-sm md:text-xl font-bold text-[#1e293b]">
                Today's Overview
              </h2>
              <button className="text-[var(--primary-color)] text-xs md:text-sm font-semibold flex items-center gap-1 hover:underline">
                View Details <FaChevronRight size={10} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              <StatCard
                icon={<FaUserCheck className="text-[#10b981]" />}
                count={stats.present}
                label="Students Present"
                bgColor="bg-[#ecfdf5]"
              />
              <StatCard
                icon={<FaUserTimes className="text-[#ef4444]" />}
                count={stats.absent}
                label="Students Absent"
                bgColor="bg-[#fef2f2]"
              />
              <StatCard
                icon={<FaClipboardCheck className="text-[#f59e0b]" />}
                count={stats.pendingHomework}
                label="Homework Pending"
                bgColor="bg-[#fffbeb]"
              />
              <StatCard
                icon={<IoSchool className="text-[#3b82f6]" />}
                count={stats.papersToCheck}
                label="Papers To Check"
                bgColor="bg-[#eff6ff]"
              />
            </div>
          </div>

          {/* Circulars */}
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[#1e293b]">Circulars</h2>
            </div>

            <div className="flex flex-col gap-4">
              {notices.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 text-gray-400 opacity-50">
                  <HiOutlineSpeakerphone size={40} className="mb-4" />
                  <p className="italic">No active circulars.</p>
                </div>
              ) : (
                notices.map((notice) => (
                  <div
                    key={notice.id}
                    onClick={() => handleNoticeClick(notice)}
                    className="flex items-start justify-between group cursor-pointer border-b border-gray-50 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex gap-4">
                      <div
                        className={`p-3 rounded-2xl ${
                          notice.isImportant ? "bg-[#fff7ed]" : "bg-[#f0fdf4]"
                        } text-[#f97316]`}
                      >
                        {notice.isImportant ? (
                          <FaTrophy size={20} className="text-[#f59e0b]" />
                        ) : (
                          <HiOutlineSpeakerphone
                            size={20}
                            className="text-[#10b981]"
                          />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#334155] group-hover:text-[var(--primary-color)] transition-colors">
                          {notice.title}
                        </h3>
                        <p className="text-sm text-[#94a3b8] flex items-center gap-2 mt-1">
                          {new Date(notice.createdAt).toLocaleDateString()}
                          {notice.isImportant && (
                            <>
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                              <span className="text-[#f59e0b] font-bold text-[10px] uppercase">
                                Important
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Right Section: Upcoming Events & My Class */}
        <div className="flex flex-col gap-2">
          {/* Upcoming Events */}
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-gray-100">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-[#1e293b]">
                Upcoming Events
              </h2>
              <button className="text-[var(--primary-color)] text-sm font-semibold flex items-center gap-1 hover:underline">
                View All <FaChevronRight size={10} />
              </button>
            </div>

            <div className="flex flex-col gap-6">
              {UPCOMING_EVENTS.map((event, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-4 group cursor-pointer px-2 py-1 hover:bg-gray-50 rounded-2xl transition-all"
                >
                  <div className="min-w-[60px] h-[60px] bg-blue-50 rounded-2xl flex flex-col items-center justify-center border border-blue-100 group-hover:bg-[var(--primary-color)] transition-all">
                    <span className="text-xs font-bold text-[var(--primary-color)] group-hover:text-white uppercase">
                      Dec
                    </span>
                    <span className="text-xl font-black text-[#1e293b] group-hover:text-white">
                      {event.day}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-[#334155] text-sm group-hover:text-[#1e293b]">
                      {event.title}
                    </h4>
                    <p className="text-xs text-[#94a3b8] mt-1">
                      {event.time}, {event.location}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Class */}
          <div className="bg-white rounded-3xl shadow-sm p-6 sm:p-8 border border-gray-100 flex-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="bg-[#f0fdfa] p-2 rounded-lg">
                  <IoSchool className="text-[#0d9488]" size={20} />
                </div>
                <h2 className="text-xl font-bold text-[#1e293b]">My Class</h2>
              </div>
              <button className="text-[var(--primary-color)] text-sm font-semibold hover:underline">
                View All
              </button>
            </div>

            {myClass ? (
              <div className="space-y-6">
                <div>
                  <p className="text-[#64748b] text-sm">
                    Class Teacher:{" "}
                    <span className="text-[#1e293b] font-bold">
                      {teacher.fullName}
                    </span>
                  </p>
                  <h3 className="text-2xl font-black text-[#1e293b] mt-1">
                    {myClass.className} <span className="text-gray-300">|</span>{" "}
                    '{myClass.section}'
                  </h3>
                  <p className="text-xs text-[#94a3b8] mt-1 font-medium italic">
                    Total Students: {myClass.totalStudents}
                  </p>
                </div>

                <div className="flex flex-col gap-3">
                  <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100/50 flex items-center justify-between hover:bg-blue-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FaBookOpen className="text-blue-500" />
                      </div>
                      <div>
                        <p className="font-bold text-[#334155] text-sm">
                          Math Assignment
                        </p>
                        <p className="text-[10px] text-[#64748b]">
                          Pending | Due: 28 Feb
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100/50 flex items-center justify-between hover:bg-emerald-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                        <FaClipboardCheck className="text-emerald-500" />
                      </div>
                      <div>
                        <p className="font-bold text-[#334155] text-sm">
                          English Test
                        </p>
                        <p className="text-[10px] text-[#64748b]">
                          Upcoming | 1 March
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <button className="w-full py-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-xs font-bold text-[#64748b] transition-all">
                    View Complete Schedule
                  </button>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-50 space-y-2">
                <IoSchool size={40} />
                <p className="text-sm font-medium">
                  No class assigned as Class Teacher
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <NoticePreviewModal
        notice={selectedNotice}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
};

const StatCard = ({ icon, count, label, bgColor }) => (
  <div
    className={`p-4 rounded-[2rem] ${bgColor} flex flex-col items-center justify-center text-center group hover:scale-[1.02] transition-all duration-300 shadow-sm border border-black/5`}
  >
    <div className="mb-3 text-2xl group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <div className="text-2xl font-black text-[#1e293b] mb-0.5">{count}</div>
    <div className="text-[10px] sm:text-xs font-bold text-[#64748b] uppercase tracking-wider leading-tight">
      {label.split(" ").map((word, i) => (
        <div key={i}>{word}</div>
      ))}
    </div>
  </div>
);

export default TeacherDashboard;
