import React, { useState, useEffect } from "react";
import {
  FaReply,
  FaSpinner,
  FaCheckCircle,
  FaUser,
  FaBook,
  FaCalendarAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getPendingDoubts, answerDoubt } from "../../utils/doubtsManager";
import { useToast } from "../../context/ToastContext";
import Button from "../../components/ui/Button";
import FileUpload from "../../components/ui/FileUpload";

const Solutions = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pendingDoubts, setPendingDoubts] = useState([]);
  const [selectedDoubt, setSelectedDoubt] = useState(null);

  const [replyData, setReplyData] = useState({
    answer: "",
    file: null,
    fileName: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchDoubts();
  }, []);

  const fetchDoubts = () => {
    const doubts = getPendingDoubts();
    setPendingDoubts(doubts);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        showToast("File size should be less than 2MB", "error");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setReplyData({
          ...replyData,
          file: reader.result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearFile = () => {
    setReplyData({
      ...replyData,
      file: null,
      fileName: "",
    });
  };

  const handleSendReply = async () => {
    if (!replyData.answer) {
      showToast("Please write an answer", "warning");
      return;
    }

    setIsSubmitting(true);
    const result = answerDoubt(
      selectedDoubt.id,
      replyData.answer,
      replyData.file,
    );

    if (result.success) {
      showToast(result.message, "success");
      setSelectedDoubt(null);
      setReplyData({ answer: "", file: null, fileName: "" });
      fetchDoubts();
    } else {
      showToast(result.message, "error");
    }
    setIsSubmitting(false);
  };

  return (
    <section className="w-full min-h-screen bg-[#f3f4f6] py-8 px-4 flex flex-col items-center">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LIST OF QUESTIONS */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">
              Pending Questions ({pendingDoubts.length})
            </h2>
            <div className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
              {pendingDoubts.length === 0 ? (
                <div className="bg-white p-10 rounded-3xl border border-gray-100 flex flex-col items-center text-center shadow-sm">
                  <FaCheckCircle size={40} className="text-green-500 mb-2" />
                  <p className="text-gray-400 font-bold">All caught up!</p>
                </div>
              ) : (
                pendingDoubts.map((doubt) => (
                  <div
                    key={doubt.id}
                    onClick={() => setSelectedDoubt(doubt)}
                    className={`p-5 rounded-2xl cursor-pointer transition-all border-l-4 ${
                      selectedDoubt?.id === doubt.id
                        ? "bg-blue-600 border-blue-900 shadow-xl scale-[1.02]"
                        : "bg-white border-blue-200 hover:border-blue-400 shadow-sm"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded ${
                          selectedDoubt?.id === doubt.id
                            ? "bg-blue-500 text-white"
                            : "bg-blue-50 text-blue-600"
                        }`}
                      >
                        {doubt.subject}
                      </span>
                      <span
                        className={`text-[10px] font-bold ${selectedDoubt?.id === doubt.id ? "text-blue-100" : "text-gray-400"}`}
                      >
                        {doubt.date}
                      </span>
                    </div>
                    <h4
                      className={`font-bold mb-1 truncate ${selectedDoubt?.id === doubt.id ? "text-white" : "text-gray-800"}`}
                    >
                      {doubt.studentName}
                    </h4>
                    <p
                      className={`text-xs line-clamp-2 ${selectedDoubt?.id === doubt.id ? "text-blue-50" : "text-gray-500"}`}
                    >
                      {doubt.question}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* REPLY SECTION */}
          <div className="lg:col-span-2">
            {selectedDoubt ? (
              <div className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col border border-gray-100 animate-fade-in">
                <div className="p-8 border-b border-gray-50">
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                      <FaUser className="text-blue-600" size={12} />
                      <span className="text-xs font-bold text-gray-700">
                        {selectedDoubt.studentName} ({selectedDoubt.class}-
                        {selectedDoubt.section})
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                      <FaBook className="text-indigo-600" size={12} />
                      <span className="text-xs font-bold text-gray-700">
                        {selectedDoubt.subject}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                      <FaCalendarAlt className="text-purple-600" size={12} />
                      <span className="text-xs font-bold text-gray-700">
                        {selectedDoubt.date}
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50/50 rounded-2xl p-6 border border-blue-100 mb-8 shadow-inner">
                    <h3 className="text-blue-800 font-black text-[10px] uppercase tracking-widest mb-3">
                      Question from Student
                    </h3>
                    <p className="text-gray-800 text-lg leading-relaxed italic font-medium">
                      "{selectedDoubt.question}"
                    </p>
                    {selectedDoubt.questionFile && (
                      <div className="mt-4">
                        <Button
                          variant="ghost"
                          className="text-xs py-1"
                          onClick={() =>
                            window.open(selectedDoubt.questionFile, "_blank")
                          }
                        >
                          View Attachment
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-2">
                        Your Professional Solution
                      </label>
                      <textarea
                        rows="8"
                        className="w-full border border-gray-200 rounded-2xl p-6 focus:border-[var(--primary-color)] focus:bg-white outline-none transition-all resize-none bg-gray-50/50 text-gray-700 font-medium leading-relaxed"
                        placeholder="Provide a detailed explanation step-by-step..."
                        value={replyData.answer}
                        onChange={(e) =>
                          setReplyData({ ...replyData, answer: e.target.value })
                        }
                      ></textarea>
                    </div>

                    <FileUpload
                      label="Attach Resources (Optional)"
                      file={replyData.file ? replyData.fileName : null}
                      onChange={handleFileChange}
                      onClear={handleClearFile}
                      labelClassName="text-xs font-black text-gray-400 uppercase tracking-widest px-2"
                      helperText="Upload image/PDF explanation (Max 2MB)"
                    />
                  </div>
                </div>

                <div className="p-6 bg-gray-50 flex justify-end gap-4 border-t border-gray-100">
                  <Button
                    variant="ghost"
                    onClick={() => setSelectedDoubt(null)}
                    className="px-8"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSendReply}
                    disabled={isSubmitting}
                    className="px-10 py-4 rounded-xl shadow-lg shadow-blue-100"
                    icon={
                      isSubmitting ? (
                        <FaSpinner className="animate-spin" />
                      ) : (
                        <FaReply />
                      )
                    }
                  >
                    {isSubmitting ? "Sending..." : "Send Solution"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-16 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center gap-4">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-2">
                  <FaReply size={32} className="text-blue-600 opacity-20" />
                </div>
                <h3 className="text-xl font-black text-gray-800">
                  Select a question to reply
                </h3>
                <p className="text-gray-400 max-w-sm font-medium">
                  Click on any question from the list on the left to start
                  providing your expert solution.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
