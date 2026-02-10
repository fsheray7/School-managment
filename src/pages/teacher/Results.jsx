import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import TeacherSelector from "../../components/teacher/TeacherSelector";

const Results = () => {
  const [selection, setSelection] = useState({
    class: "",
    section: "",
    subject: "",
  });

  return (
    <section className=" w-full bg-white flex flex-col mt-12 items-center px-4">
      <TeacherSelector
        onSelectionChange={(newSelection) => setSelection(newSelection)}
      />

      <div className="w-full flex flex-col md:flex-col lg:flex-row items-center justify-center gap-10 pb-10 mt-10">
        {/* First Terminal Card */}
        <div
          className="w-full flex flex-col items-center justify-center p-6 border-t-8 rounded-2xl max-w-md shadow-xl gap-6 transition-all hover:shadow-2xl"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h2
            className="w-full flex items-center justify-start font-bold text-xl"
            style={{ color: "var(--text-primary-color)" }}
          >
            First Terminal
          </h2>

          {/* Display selected class, section, and subject */}
          <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm">
            {selection.class && selection.section && selection.subject ? (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Class:</span>{" "}
                  {selection.class}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Section:</span>{" "}
                  {selection.section}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Subject:</span>{" "}
                  {selection.subject}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">
                Please select class, section, and subject above
              </p>
            )}
          </div>

          <div className="w-full flex justify-end">
            <Link
              to="/marks"
              state={{ selection: selection, terminal: "First" }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="w-full uppercase font-bold tracking-wider"
              >
                Publish
              </Button>
            </Link>
          </div>
        </div>

        {/* Second Terminal Card */}
        <div
          className="w-full flex flex-col items-center justify-center p-6 border-t-8 rounded-2xl max-w-md shadow-xl gap-6 transition-all hover:shadow-2xl"
          style={{ borderTopColor: "var(--primary-color)" }}
        >
          <h2
            className="w-full flex items-center justify-start font-bold text-xl"
            style={{ color: "var(--text-primary-color)" }}
          >
            Second Terminal
          </h2>

          {/* Display selected class, section, and subject */}
          <div className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl shadow-sm">
            {selection.class && selection.section && selection.subject ? (
              <div className="flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Class:</span>{" "}
                  {selection.class}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Section:</span>{" "}
                  {selection.section}
                </p>
                <p className="text-sm font-semibold text-gray-700">
                  <span className="text-gray-500">Subject:</span>{" "}
                  {selection.subject}
                </p>
              </div>
            ) : (
              <p className="text-gray-400 text-sm italic">
                Please select class, section, and subject above
              </p>
            )}
          </div>

          <div className="w-full flex justify-end">
            <Link
              to="/marks"
              state={{ selection: selection, terminal: "Second" }}
              className="w-full sm:w-auto"
            >
              <Button
                variant="primary"
                className="w-full uppercase font-bold tracking-wider"
              >
                Publish
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Results;
