import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/ui/Button";
import CustomDropdown from "../../components/ui/CustomDropdown";
import { TEACHER_TYPE } from "../../constants/DropDownOptions";
import Button from "../../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";

const AddTeacher = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Teacher added successfully!");
    navigate("/teachers");
  };

  const [teacherData, SetTeacherData] = useState({
    fullname: "",
    email: "",
    subject: "",
    section: "",
    contact: "",
    type: "",
  });

  const handleBack = () => {
    navigate("/teachers");
  };

  return (
    <section className="relative flex flex-col items-center  w-full bg-white  px-4  ">
      {/* Top Half Circle */}
      {/* <div
        className="absolute rounded-full bg-[#28C2A0] 
          w-150 h-150 sm:w-200 sm:h-200 md:w-340 md:h-340 lg:w-400 lg:h-405   
         
          -top-110 sm:-top-122 md:-top-280 lg:-top-370 
          transition-all duration-300 "
      ></div> */}

      {/* Add Photo */}
      {/* Center Logo Image - Responsive - Moved to Top */}
      {/* <div
        className="absolute top-20 sm:top-12 md:top-30 lg:top-16
          left-1/2 -translate-x-1/2
          flex rounded-full flex-col items-center justify-center 
          z-10 w-full"
      >
        <img
          src="./profileselection/Vector.png"
          alt="Logo Img"
          className="w-30 h-30 sm:w-90 sm:h-92 md:w-95 md:w-40 md:h-40 lg:w-30 lg:h-30 
            object-contain transition-all duration-300"
        />
        <LuPlus className="  absolute text-gray-400 text-6xl sm:text-4xl lg:text-5xl" />

        <p className=" absolute top-23 md:top-30 lg:top-20   text-xs sm:text-sm md:text-base lg:text-sm text-[#28C2A0] font-medium">
          Add Photo
        </p>
      </div> */}

      {/* Form */}
      <form
        className="w-full max-w-2xl mt-36 md:mt-30 grid grid-cols-2 flex-col cols-2 gap-4"
        onSubmit={handleSubmit}
      >
        <div className="col-span-2 flex justify-between items-center">
          <h3 className=" text-[#0C46C4] font-semibold text-lg mb-2">
            Teacher Info
          </h3>
          <Button onClick={handleBack} variant="ghost" icon={<IoArrowBack />} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4]  placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">Email</label>
          <input
            type="email"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Subject
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Section
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-md font-semibold text-[#000000]">
            Contact
          </label>
          <input
            type="text"
            placeholder="Enter Something..."
            className="border border-[#0C46C4] placeholder-gray-400 rounded-lg p-2 text-sm focus:outline-none"
          />
        </div>

        <div className="flex flex-col gap-2 ">
          <label className="text-md font-semibold text-[#000000]">Type</label>

          <div className="flex  rounded-md  justify-start bg-white ">
            <CustomDropdown
              value={teacherData.type}
              onChange={(val) => SetTeacherData({ ...teacherData, type: val })}
              options={TEACHER_TYPE}
              placeholder="Select Type"
              className="w-full"
              triggerClassName="border-[#0C46C4]"
            />
            {/* <div className="flex items-center gap-2">
              <p className="text-md text-[#000000]">Regular</p>
              <input
                type="radio"
                name="type"
                className="w-4 h-4 border border-[#0C46C4] rounded cursor-pointer"
              />
            </div> */}

            {/* <div className="flex items-center gap-2">
              <p className="text-md text-[#000000]">Contractual</p>
              <input
                type="radio"
                name="type"
                className="w-4 h-4  rounded cursor-pointer"
              />
            </div> */}
          </div>
        </div>

        {/* Submit */}
        <div className="col-span-2 flex justify-center items-center">
          <Button variant="primary" className="mt-4">
            Add Teacher
          </Button>
        </div>
      </form>
    </section>
  );
};

export default AddTeacher;
