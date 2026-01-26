import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuPlus } from "react-icons/lu";
import CustomDropdown from "../../components/ui/CustomDropdown";

const AddCourse = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    courseName: "",
    courseCode: "",
    instructor: "",
    class: "",
    section: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Course added:", courseData);
    alert("Course added successfully!");
    navigate("/courses");
  };

  return (
    <section className="relative flex flex-col items-center  w-full bg-white overflow-hidden px-8 ">
      {/* Top Half Circle Decor - Shared Theme */}
      {/* <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-400 lg:h-405   
          -top-110 sm:-top-122 md:-top-280 lg:-top-370 
          transition-all duration-300 "
      ></div> */}

      {/* Decorative Icon Area */}
      {/* <div
        className="absolute top-20 sm:top-12 md:top-30 lg:top-16
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <div className="relative flex items-center justify-center w-24 h-24 bg-white/20 backdrop-blur-md rounded-full border-2 border-white/50">
          <LuPlus className="text-white text-5xl" />
        </div>
        <p className="mt-2 text-[#28C2A0] font-medium">New Course</p>
      </div> */}

      <form
        className="w-full mt-20 grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-8 rounded-2xl relative z-20"
        onSubmit={handleSubmit}
      >
        <h3 className="col-span-1 sm:col-span-2 text-2xl font-bold text-[#0C46C4] mb-2">
          Course Information
        </h3>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Course Name
          </label>
          <input
            type="text"
            name="courseName"
            value={courseData.courseName}
            onChange={handleChange}
            placeholder="Enter Course Name..."
            required
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Course Code
          </label>
          <input
            type="text"
            name="courseCode"
            value={courseData.courseCode}
            onChange={handleChange}
            placeholder="Enter Course Code..."
            required
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Instructor
          </label>
          <input
            type="text"
            name="instructor"
            value={courseData.instructor}
            onChange={handleChange}
            placeholder="Search Instructor..."
            required
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">Status</label>
          <CustomDropdown
            options={["Active", "Inactive"]}
            value={courseData.status}
            onChange={(val) => setCourseData({ ...courseData, status: val })}
            placeholder="Select Status"
            containerClassName="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">Class</label>
          <CustomDropdown
            options={["1", "2", "3"]}
            value={courseData.class}
            onChange={(val) => setCourseData({ ...courseData, class: val })}
            placeholder="Select Class"
            containerClassName="w-full"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Section
          </label>
          <CustomDropdown
            options={["A", "B", "C"]}
            value={courseData.section}
            onChange={(val) => setCourseData({ ...courseData, section: val })}
            placeholder="Select Section"
            containerClassName="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="col-span-1 sm:col-span-2 flex justify-between mt-6">
          <div className="ml-auto flex gap-2 w-full">
            <button
              type="submit"
              className="flex-1 bg-[#0C46C4] hover:bg-[#08308d] text-white font-semibold rounded-md py-2 px-4 text-sm transition-all cursor-pointer"
            >
              Add Course
            </button>
            <button
              type="button"
              onClick={() => navigate("/courses")}
              className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold rounded-md py-2 px-4 text-sm transition-all cursor-pointer"
            >
              Go Back
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddCourse;
