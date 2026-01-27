import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/ui/CustomDropdown";
import {
  GENDER_OPTIONS,
  CLASS_OPTIONS,
  getSectionsByClass,
} from "../../constants/DropDownOptions";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";

const AddStudent = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(1);

  // Form state
  const [studentData, setStudentData] = useState({
    studentId: "",
    fullName: "",
    gender: "",
    dob: "",
    profilePhoto: null,
    classGrade: "",
    section: "",
    academicYear: "",
    rollNumber: "",
    studentPhone: "",
    parentName: "",
    parentPhone: "",
    parentEmail: "",
    address: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profilePhoto") {
      setStudentData({ ...studentData, profilePhoto: files[0] });
    } else {
      setStudentData({ ...studentData, [name]: value });
    }
  };

  const handleNext = () => setActiveTab(activeTab + 1);
  const handleBack = () => setActiveTab(activeTab - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab < 3) {
      handleNext();
    } else {
      console.log("Final submission data:", studentData);
      alert("Student added successfully!");
      navigate("/students");
    }
  };

  return (
    <section className="relative flex flex-col items-center rounded-xl w-full bg-white  py-4  mt-20 px-8 ">
      {/* Tabs */}
      <form
        className="w-full flex flex-col max-w-xl gap-4"
        onSubmit={handleSubmit}
      >
        {/* Tab 1: Basic Info */}
        {activeTab === 1 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="col-span-2 sm:col-span-2 flex items-center justify-between">
              <h3 className="text-[#0C46C4] font-semibold text-lg mb-2">
                Student Info
              </h3>
              <Button onClick={() => navigate("/students")}
              variant="ghost"
              icon={<IoArrowBack   size={20}/>} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold  text-[#000000]">
                Student ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="studentId"
                value={studentData.studentId}
                onChange={handleChange}
                placeholder="Enter Student ID..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={studentData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Gender <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={GENDER_OPTIONS}
                value={studentData.gender}
                onChange={(val) =>
                  setStudentData({ ...studentData, gender: val })
                }
                placeholder="Select Gender"
                triggerClassName="text-[#0C46C4] py-2 "
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                className="border border-[#0C46C4] rounded-md p-2 text-sm text-gray-400 focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2 col-span-2 sm:col-span-2">
              <label className="text-md font-semibold text-[#000000]">
                Profile Photo <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                className="border border-[#0C46C4] text-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {/* Tab 2: Academic Info */}
        {activeTab === 2 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="flex justify-between col-span-2 text-[#0C46C4]">
              <h3 className=" font-semibold text-lg ">Academic Info</h3>
              <Button onClick={handleBack}
              variant="ghost"
              icon={<IoArrowBack   size={20}/>} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Class/Grade <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={CLASS_OPTIONS}
                value={studentData.classGrade}
                onChange={(val) =>
                  setStudentData({ ...studentData, classGrade: val })
                }
                placeholder="Select Class"
                containerClassName="w-full"
                triggerClassName="text-[#0C46C4] py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Section <span className="text-red-500">*</span>
              </label>
              <CustomDropdown
                options={getSectionsByClass(studentData.classGrade)}
                value={studentData.section}
                onChange={(val) =>
                  setStudentData({ ...studentData, section: val })
                }
                placeholder="Select Section"
                containerClassName="w-full"
                triggerClassName="text-[#0C46C4] py-2"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Academic Year <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="academicYear"
                value={studentData.academicYear}
                onChange={handleChange}
                placeholder="Enter Academic Year..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Roll Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="rollNumber"
                value={studentData.rollNumber}
                onChange={handleChange}
                placeholder="Enter Roll Number..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {/* Tab 3: Contact Info */}
        {activeTab === 3 && (
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-between items-center">
              <h3 className=" text-[#0C46C4] font-semibold text-lg mb-2">
                Contact Info
              </h3>
              <Button onClick={handleBack}
              variant="ghost"
              icon={<IoArrowBack   size={20}/>} />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Student Phone
              </label>
              <input
                type="text"
                name="studentPhone"
                value={studentData.studentPhone}
                onChange={handleChange}
                placeholder="Enter Phone..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentName"
                value={studentData.parentName}
                onChange={handleChange}
                placeholder="Enter Parent Name..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Phone <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="parentPhone"
                value={studentData.parentPhone}
                onChange={handleChange}
                placeholder="Enter Parent Phone..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="parentEmail"
                value={studentData.parentEmail}
                onChange={handleChange}
                placeholder="Enter Parent Email..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-2 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col col-span-2 sm:col-span-2 gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={studentData.address}
                onChange={handleChange}
                placeholder="Enter Address..."
                className="border border-[#0C46C4] placeholder-gray-400 rounded-md p-4 text-sm focus:outline-none"
                required
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center  items-center mt-6">
          <div className=" flex justify-center items-center gap-6">
            <Button
              type="submit"
              variant="primary"
              className="w-50"
             
            >
              {activeTab < 3 ? "Next" : "Save"}
            </Button>
           
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddStudent;
