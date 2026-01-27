import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CustomDropdown from "../../components/ui/CustomDropdown";
import {
  CLASS_OPTIONS,
  getSectionsByClass,
  COURSE_STATUS,
} from "../../constants/DropDownOptions";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";

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
    <section className="relative flex flex-col justify-center items-center max-w-4xl  w-full bg-white md:px-8 ">

      <form
        className="w-full mt-20 grid grid-cols-2 sm:grid-cols-2 gap-4 bg-white  md:p-8 rounded-2xl relative z-20"
        onSubmit={handleSubmit}
      >
        <div className="col-span-2 sm:col-span-2 flex items-center justify-between">
          <h3 className=" text-2xl font-bold text-[#0C46C4] ">
            Course Information
          </h3>
          <Button onClick={() => navigate("/courses")}
          variant="ghost"
          icon={<IoArrowBack size={20} />}
           />
        </div>

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
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-1.5 md:p-2 text-xs md:text-sm focus:outline-none"
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
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-md p-1.5 md:p-2 text-xs md:text-sm focus:outline-none"
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
            className="border border-[#0C46C4] placeholder-[#5B58AD] rounded-lg p-1.5 md:p-2 text-xs md:text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">Status</label>
          <CustomDropdown
            options={COURSE_STATUS}
            value={courseData.status}
            onChange={(val) => setCourseData({ ...courseData, status: val })}
            placeholder="Select Status"
            containerClassName="w-full "
            triggerClassName="border border-[#0C46C4] rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">Class</label>
          <CustomDropdown
            options={CLASS_OPTIONS}
            value={courseData.class}
            onChange={(val) => setCourseData({ ...courseData, class: val })}
            placeholder="Select Class"
            containerClassName="w-full"
            triggerClassName="border border-[#0C46C4] rounded-lg"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Section
          </label>
          <CustomDropdown
            options={getSectionsByClass(courseData.class)}
            value={courseData.section}
            onChange={(val) => setCourseData({ ...courseData, section: val })}
            placeholder="Select Section"
            containerClassName="w-full"
            triggerClassName="border border-[#0C46C4] rounded-lg"
          />
        </div>

        {/* Action Buttons */}
        <div className="col-span-2 sm:col-span-2 flex justify-center items-center mt-6">
          <div className=" flex justify-center items-center gap-2 w-full">
            <button
              type="submit"
              className="flex-1 bg-[#0C46C4] max-w-[220px] hover:bg-[#08308d] text-white font-semibold rounded-md py-2 hover:scale-105 transition-transform duration-300 px-4 text-sm transition-all cursor-pointer"
            >
              Add Course
            </button>
          </div>
        </div>
      </form>
    </section>
  );
};

export default AddCourse;
