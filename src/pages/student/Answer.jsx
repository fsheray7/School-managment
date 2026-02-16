import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getDoubtById } from "../../utils/doubtsManager";
import Button from "../../components/ui/Button";
import {
  FaArrowLeft,
  FaDownload,
  FaClock,
  FaQuestionCircle,
  FaPaperclip,
} from "react-icons/fa";

const Answer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { doubtId } = location.state || {};
  const [doubt, setDoubt] = useState(null);

  useEffect(() => {
    if (doubtId) {
      const data = getDoubtById(doubtId);
      setDoubt(data);
    } else {
      navigate("/questions");
    }
  }, [doubtId, navigate]);

  const handleDownload = (base64Data, fileName) => {
    if (!base64Data) return;
    const link = document.createElement("a");
    link.href = base64Data;
    link.download = fileName || "attachment";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!doubt) return null;

  return (
    <section className="w-full bg-[#f3f4f6] pt-4 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        {/* HEADER */}
        {/* <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="p-2 bg-white rounded-full shadow-sm hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-gray-600" />
          </button>
          <h1 className="text-2xl font-black text-gray-800 tracking-tight">
            Doubt Details
          </h1>
        </div> */}

        {/* QUESTION CARD */}
        <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 animate-fade-in">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col">
              <span className="text-xs font-black text-[var(--primary-color)] uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full w-fit">
                {doubt.subject}
              </span>
              <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold mt-2">
                <FaClock /> Asked on {doubt.date}
              </div>
            </div>
            <span
              className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                doubt.status === "Answered"
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {doubt.status}
            </span>
          </div>

          <div className="mb-8">
            <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-widest mb-3">
              Your Question
            </h2>
            <p className="text-gray-800 text-xl font-bold italic leading-relaxed">
              "{doubt.question}"
            </p>
            {doubt.questionFile && (
              <Button
                variant="ghost"
                onClick={() =>
                  handleDownload(
                    doubt.questionFile,
                    `question_attachment_${doubt.id}`,
                  )
                }
                className="mt-4 text-xs py-1"
                icon={<FaPaperclip />}
              >
                View Your Attachment
              </Button>
            )}
          </div>

          <hr className="border-gray-50 mb-8" />

          {/* TEACHER'S ANSWER */}
          <div>
            <h2 className="text-gray-400 text-[10px] font-black uppercase tracking-widest ">
              Teacher's Response
            </h2>
            {doubt.status === "Answered" ? (
              <div className="flex flex-col gap-6">
                <div className="bg-blue-50/30 rounded-2xl p-4 border border-blue-100 shadow-inner">
                  <p className="text-gray-700 text-md leading-relaxed font-medium">
                    {doubt.answer}
                  </p>
                </div>

                {doubt.answerFile && (
                  <div className="flex justify-start">
                    <Button
                      onClick={() =>
                        handleDownload(doubt.answerFile, `solution_${doubt.id}`)
                      }
                      className="flex items-center gap-2 px-8 rounded-xl shadow-lg shadow-blue-100"
                      icon={<FaDownload />}
                    >
                      Download Solution File
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-2xl p-10 flex flex-col items-center justify-center text-center gap-3 border border-dashed border-gray-200">
                <FaQuestionCircle
                  size={40}
                  className="text-gray-300 animate-pulse"
                />
                <p className="text-gray-400 font-bold">
                  Waiting for teacher's response...
                </p>
                <p className="text-[10px] text-gray-400 max-w-xs uppercase font-black tracking-widest">
                  Our experts usually respond within 24 hours.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* FOOTER ACTION */}
        <div className="flex justify-center mt-2">
          <Button
            variant="ghost"
            onClick={() => navigate("/questions")}
            className="text-gray-400 font-bold hover:text-gray-600 transition-colors"
          >
            Back to my list
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Answer;
