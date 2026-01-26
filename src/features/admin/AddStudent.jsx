import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import CustomDropdown from "../../components/ui/CustomDropdown";

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
    <section className="relative flex flex-col items-center rounded-xl w-full bg-white py-4 overflow-hidden mt-20 px-8 ">
      {/* Tabs */}
      <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Tab 1: Basic Info */}
        {activeTab === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h3 className="col-span-2 text-[#0C46C4] font-semibold text-lg mb-2">
              Student Info
            </h3>
            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold  text-[#000000]">
                Student ID
              </label>
              <input
                type="text"
                name="studentId"
                value={studentData.studentId}
                onChange={handleChange}
                placeholder="Enter Student ID..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={studentData.fullName}
                onChange={handleChange}
                placeholder="Enter Full Name..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Gender
              </label>
              <CustomDropdown
                options={["Male", "Female", "Other"]}
                value={studentData.gender}
                onChange={(val) =>
                  setStudentData({ ...studentData, gender: val })
                }
                placeholder="Select Gender"
                containerClassName="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Date of Birth
              </label>
              <input
                type="date"
                name="dob"
                value={studentData.dob}
                onChange={handleChange}
                className="border border-[#0C46C4] rounded-md p-2 text-sm text-[#5B58AD] focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2 col-span-1 sm:col-span-2">
              <label className="text-md font-semibold text-[#000000]">
                Profile Photo
              </label>
              <input
                type="file"
                name="profilePhoto"
                onChange={handleChange}
                className="border border-[#0C46C4] text-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 2: Academic Info */}
        {activeTab === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h3 className="col-span-2 text-[#0C46C4] font-semibold text-lg mb-2">
              Academic Info
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Class/Grade
              </label>
              <CustomDropdown
                options={["1", "2", "3"]}
                value={studentData.classGrade}
                onChange={(val) =>
                  setStudentData({ ...studentData, classGrade: val })
                }
                placeholder="Select Class"
                containerClassName="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Section
              </label>
              <CustomDropdown
                options={["A", "B"]}
                value={studentData.section}
                onChange={(val) =>
                  setStudentData({ ...studentData, section: val })
                }
                placeholder="Select Section"
                containerClassName="w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Academic Year
              </label>
              <input
                type="text"
                name="academicYear"
                value={studentData.academicYear}
                onChange={handleChange}
                placeholder="Enter Academic Year..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Roll Number
              </label>
              <input
                type="text"
                name="rollNumber"
                value={studentData.rollNumber}
                onChange={handleChange}
                placeholder="Enter Roll Number..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Tab 3: Contact Info */}
        {activeTab === 3 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <h3 className="col-span-2 text-[#0C46C4] font-semibold text-lg mb-2">
              Contact Info
            </h3>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Student Phone (Optional)
              </label>
              <input
                type="text"
                name="studentPhone"
                value={studentData.studentPhone}
                onChange={handleChange}
                placeholder="Enter Phone..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Name
              </label>
              <input
                type="text"
                name="parentName"
                value={studentData.parentName}
                onChange={handleChange}
                placeholder="Enter Parent Name..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Phone
              </label>
              <input
                type="text"
                name="parentPhone"
                value={studentData.parentPhone}
                onChange={handleChange}
                placeholder="Enter Parent Phone..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Parent Email
              </label>
              <input
                type="email"
                name="parentEmail"
                value={studentData.parentEmail}
                onChange={handleChange}
                placeholder="Enter Parent Email..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>

            <div className="flex flex-col col-span-1 sm:col-span-2 gap-2">
              <label className="text-md font-semibold text-[#000000]">
                Address
              </label>
              <textarea
                name="address"
                value={studentData.address}
                onChange={handleChange}
                placeholder="Enter Address..."
                className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          {activeTab > 1 && (
            <button
              type="button"
              onClick={handleBack}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-md py-2 px-4 text-sm"
            >
              Go Back
            </button>
          )}

          <div className="ml-auto flex gap-2">
            <button
              type="submit"
              className="bg-[#0C46C4] hover:bg-[#08308d] text-white font-semibold rounded-md py-2 px-4 text-sm"
            >
              {activeTab < 3 ? "Next" : "Save"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/students")}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-md py-2 px-4 text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddStudent;
