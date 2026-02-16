import React from "react";
import { FaTimes, FaDownload, FaBook } from "react-icons/fa";
import Button from "./Button";

const HomeworkPreviewModal = ({ isOpen, onClose, homework }) => {
  if (!isOpen || !homework) return null;

  const isImage = homework.fileType?.startsWith("image/");
  const isPDF = homework.fileType === "application/pdf";

  const handleDownload = () => {
    if (!homework.file) return;
    const link = document.createElement("a");
    link.href = homework.file;
    link.download =
      homework.fileName || `Homework-${homework.subject}-${homework.date}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
              <FaBook />
            </div>
            <div>
              <h3 className="font-bold text-gray-800">{homework.subject}</h3>
              <p className="text-xs text-gray-500">
                {homework.date} • {homework.teacherName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-full hover:bg-red-50"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content - Scrollable */}
        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          <div className="prose max-w-none">
            <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
              Description
            </h4>
            <div className="bg-gray-50 p-4 rounded-xl text-gray-700 whitespace-pre-wrap leading-relaxed border border-gray-100">
              {homework.description || "No description provided."}
            </div>
          </div>

          {homework.file && (
            <div className="mt-6">
              <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">
                Attachment
              </h4>
              <div className="bg-gray-50 rounded-xl border border-gray-200 overflow-hidden flex flex-col items-center justify-center min-h-[150px]">
                {isImage ? (
                  <img
                    src={homework.file}
                    alt="Homework Attachment"
                    className="max-w-full h-auto object-contain max-h-[400px]"
                  />
                ) : isPDF ? (
                  <div className="flex flex-col items-center gap-2 p-8 text-red-500">
                    <FaBook size={48} />
                    <span className="font-medium">PDF Document</span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-8 text-gray-500">
                    <FaBook size={48} />
                    <span className="font-medium">
                      File Attachment (
                      {homework.fileType?.split("/")[1] || "Unknown"})
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
          {homework.file && (
            <Button
              variant="primary"
              onClick={handleDownload}
              icon={<FaDownload />}
            >
              Download File
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeworkPreviewModal;
