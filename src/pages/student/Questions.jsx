import React, { useState, useEffect } from "react";
import {
  FaPlus,
  FaArrowRight,
  FaCheckCircle,
  FaQuestionCircle,
} from "react-icons/fa";
import Button from "../../components/ui/Button";
import DataCard from "../../components/ui/DataCard";
import { useNavigate } from "react-router-dom";
import { getStudentDoubts } from "../../utils/doubtsManager";

const Questions = () => {
  const navigate = useNavigate();
  const [myQuestions, setMyQuestions] = useState([]);
  const [student, setStudent] = useState(null);

  useEffect(() => {
    const storedStudent = localStorage.getItem("currentStudent");
    if (storedStudent) {
      const studentData = JSON.parse(storedStudent);
      setStudent(studentData);
      const data = getStudentDoubts(studentData.id);
      setMyQuestions(data);
    } else {
      navigate("/");
    }
  }, [navigate]);

  if (!student) return null;

  return (
    <section className="w-full min-h-screen bg-[#f3f4f6] py-10 px-4 flex flex-col items-center">
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
     
        <Button
          onClick={() => navigate("/ask-question")}
          icon={<FaPlus />}
          variant="primary"
          className="rounded-xl px-6 py-3 shadow-lg shadow-blue-100"
        >
          Ask New Question
        </Button>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-6">
        {myQuestions.length === 0 ? (
          <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border-2 border-dashed border-gray-200">
            <FaQuestionCircle size={48} className="text-gray-300 mb-4" />
            <p className="text-gray-400 font-bold text-xl">
              No questions asked yet.
            </p>
            <Button
              variant="ghost"
              onClick={() => navigate("/ask-question")}
              className="mt-4"
            >
              Ask your first question now
            </Button>
          </div>
        ) : (
          myQuestions.map((q) => (
            <DataCard
              key={q.id}
              title={q.subject}
              borderAccent={
                q.status === "Answered"
                  ? "border-green-500"
                  : "border-yellow-500"
              }
              fields={[
                {
                  label: "Date",
                  value: q.date,
                },
                {
                  label: "Question",
                  value: q.question,
                  render: (val) => (
                    <p className="text-gray-700 italic font-medium line-clamp-2 mt-1">
                      "{val}"
                    </p>
                  ),
                },
                {
                  label: "Status",
                  value: q.status,
                  render: (val) => (
                    <span
                      className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest ${
                        val === "Answered"
                          ? "text-green-500"
                          : "text-yellow-600"
                      }`}
                    >
                      {val === "Answered" ? (
                        <FaCheckCircle size={10} />
                      ) : (
                        <FaQuestionCircle size={10} />
                      )}
                      {val}
                    </span>
                  ),
                },
              ]}
              actions={
                <div className="flex flex-col w-full gap-3">
                  {q.status === "Answered" && (
                    <div className="bg-green-50 px-4 py-2 rounded-lg border border-green-100 text-center">
                      <p className="text-[10px] text-green-700 font-black uppercase tracking-wider">
                        Teacher has replied!
                      </p>
                    </div>
                  )}
                  <Button
                    variant="ghost"
                    className="w-full py-2 group"
                    onClick={() =>
                      navigate("/answer", { state: { doubtId: q.id } })
                    }
                  >
                    Details
                    <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              }
            />
          ))
        )}
      </div>
    </section>
  );
};

export default Questions;
