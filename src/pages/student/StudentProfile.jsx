import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDownload, FaEdit } from "react-icons/fa";
import { IoShareSocialOutline, IoLogOutOutline } from "react-icons/io5";
import { FaUser, FaUsers } from "react-icons/fa";
import Button from "../../components/ui/Button";
import finalStudentsData from "../../data/admindata/students/students";

const StudentProfile = () => {
  const navigate = useNavigate();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const sessionData = JSON.parse(storedStudent);
      const updatedStudent =
        finalStudentsData.find((s) => s.id === sessionData.id) || sessionData;
      setStudent(updatedStudent);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!student) return null;

  const infoItems = [
    { label: "Student ID", value: student.id },
    { label: "Grade", value: `${student.class} '${student.section}'` },
    { label: "Roll No", value: student.rollNumber || "N/A" },
    { label: "Address", value: student.address || "N/A" },
    { label: "Gender", value: student.gender },
    { label: "Guardian's Name", value: student.guardianName },
    { label: "Email", value: student.email },
    { label: "Guardian's Contact", value: student.guardianContact },
  ];

  return (
    <section className="relative w-full  bg-[#FDFDFF] flex flex-col items-center pt-24 pb-12 px-4 overflow-x-hidden">
      {/* Top Decorative Header Background */}
      <div
        className="absolute top-0 left-0 right-0 h-40 rounded-b-[40px] z-0 transition-all duration-300"
        style={{ backgroundColor: "var(--primary-color)" }}
      ></div>

      {/* Profile Card Container */}
      <div className="relative w-full mt-5 max-w-4xl bg-white rounded-3xl shadow-xl z-10 pt-6 pb-5 px-6 sm:px-10 border border-gray-100 flex flex-col gap-4">
        {/* Avatar Overlap */}
        <div className="absolute -top-16 left-10 w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white shadow-2xl overflow-hidden bg-white">
          <img
            src={student.profileImage}
            alt={student.fullName}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Header Info */}
        <div className="flex flex-col gap-1 ml-0 sm:ml-44">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#1E293B]">
            {student.fullName}
          </h1>
          <p className="text-gray-500 font-medium text-lg">
            {student.class} '{student.section}'
          </p>
        </div>

        <div className="w-full h-px bg-gray-100 mb-2"></div>

        {/* Grid Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {infoItems.map((item, index) => (
            <div key={index} className="flex flex-col gap-1 group">
              <span className="text-sm font-semibold text-[#64748B] uppercase tracking-wider">
                {item.label}:
              </span>
              <div className="w-full bg-[#F8FAFC] p-3 rounded-xl border border-transparent transition-all">
                <span className="text-[#1E293B] font-bold text-base md:text-lg">
                  {item.value}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Summary Cards */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 z-10">
        {/* Full Name Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-blue-50">
            <FaUser className="text-blue-500" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-blue-500">Full Name:</span>
            <span className="text-lg font-bold text-[#1E293B]">
              {student.fullName}
            </span>
          </div>
        </div>

        {/* Guardian Summary */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-50 flex items-center gap-5 transition-transform hover:-translate-y-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-orange-50">
            <FaUsers className="text-orange-500" size={24} />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-orange-500">Guardian:</span>
            <span className="text-lg font-bold text-[#1E293B]">
              {student.guardianName}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-12 z-10">
        <Button
          variant="ghost"
          className="p-4 flex  shadow-md border"
          title="Request Edit"
        >
          <FaEdit size={22} /> <p>Request Edit</p>
        </Button>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              localStorage.removeItem("currentStudent");
              navigate("/");
            }}
            variant="reset"
            className="flex items-center gap-2 px-6 py-3 bg-red-50 text-red-600 rounded-2xl shadow-sm border border-red-100 font-bold hover:bg-red-100 transition-all active:scale-95"
          >
            <IoLogOutOutline size={22} />
            Logout
          </Button>

          <Button
            variant="ghost"
            className="flex items-center gap-2 px-8 py-3 bg-white text-[#1E293B] rounded-2xl shadow-md border border-gray-100 font-bold hover:bg-gray-50 transition-all active:scale-95"
          >
            <IoShareSocialOutline size={22} />
            Share
          </Button>
        </div>
      </div>
    </section>
  );
};

export default StudentProfile;
