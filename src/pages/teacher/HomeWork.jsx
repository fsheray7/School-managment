import React, { useState } from "react";
import Button from "../../components/ui/Button";
import TeacherSelector from "../../components/teacher/TeacherSelector";
import FileUpload from "../../components/ui/FileUpload";

const HomeWork = () => {
  const [homeworkFile, setHomeworkFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setHomeworkFile(selectedFile);
    }
  };

  const handleClearFile = () => {
    setHomeworkFile(null);
  };
  return (
    <section className="w-full  bg-white flex flex-col items-center mt-12 px-4 sm:px-8">
      <div className="w-full max-w-4xl text-center sm:text-left">
        <h1 className="text-xl font-extrabold text-[var(--text-primary-color)] pt-2 tracking-tight ">
          Assign Homework
        </h1>
        <p className="text-gray-500 text-sm ">
          Use the dynamic selectors below to choose the class and subject for
          this assignment.
        </p>
        <TeacherSelector
          onSelectionChange={(selection) =>
            console.log("HW Selection:", selection)
          }
        />
      </div>

      <form className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-gray-100 p-4 flex flex-col gap-8 transition-all hover:shadow-2xl">
        <div className="flex justify-between gap-4 items-center">

        <div className="flex flex-col w-full gap-2">
          <label className="text-sm font-bold text-[#64748B] uppercase tracking-widest ml-1">
            Assignment Details
          </label>
          <textarea
            placeholder="Describe the homework assignment in detail..."
            rows="5"
            className="w-full h-40 outline-none border border-gray-200 p-5 rounded-2xl transition-all focus:border-[var(--primary-color)] focus:ring-4 focus:ring-[var(--primary-color)]/10 shadow-sm text-gray-700 font-medium resize-none"
          />
        </div>

        <FileUpload
          label="Attach Resources (Optional)"
          file={homeworkFile}
          onChange={handleFileChange}
          onClear={handleClearFile}
          helperText="Upload any documents, images, or instructions for students."
          />
          </div>

        <div className="flex flex-col sm:flex-row gap-6 mt-4">
          <Button type="submit" variant="primary">
            Post Assignment
          </Button>

          <Button
            variant="ghost"
            className="border border-[var(--primary-color)]"
          >
            Save Draft
          </Button>
        </div>
      </form>

      <div className="w-full max-w-4xl flex items-center justify-center gap-2  text-green-600 font-bold bg-green-50 py-3 px-6 rounded-2xl border border-green-100 animate-pulse">
        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
        Status: Ready to Upload
      </div>
    </section>
  );
};

export default HomeWork;
