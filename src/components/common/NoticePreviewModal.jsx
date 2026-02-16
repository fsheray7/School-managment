import React from "react";
import {
  FaTimes,
  FaDownload,
  FaBullhorn,
  FaCalendarAlt,
  FaUser,
} from "react-icons/fa";
import Button from "../ui/Button";

const NoticePreviewModal = ({ notice, isOpen, onClose }) => {
  if (!isOpen || !notice) return null;

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = notice.attachment;
    link.download = notice.attachmentName || "attachment";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl transform transition-all animate-scale-in">
        {/* Header */}
        <div
          className={`p-6 flex items-center justify-between text-white ${notice.isImportant ? "bg-red-600" : "bg-blue-700"}`}
        >
          <div className="flex items-center gap-3">
            <FaBullhorn size={24} />
            <h2 className="text-xl font-bold">School Announcement</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              <FaCalendarAlt />
              <span>
                {new Date(notice.createdAt).toLocaleDateString(undefined, {
                  dateStyle: "long",
                })}
              </span>
              <span className="mx-2">•</span>
              <FaUser />
              <span>{notice.author || "Admin"}</span>
            </div>
            <h3 className="text-2xl font-black text-gray-800 leading-tight">
              {notice.title}
            </h3>
          </div>

          <div className="bg-gray-50 rounded-2xl p-6 min-h-[150px]">
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {notice.details}
            </p>
          </div>

          {/* Attachment Section */}
          {notice.attachment && (
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <FaDownload />
                </div>
                <div className="overflow-hidden">
                  <p className="text-sm font-bold text-gray-800 truncate">
                    {notice.attachmentName || "Attachment"}
                  </p>
                  <p className="text-xs text-blue-600 uppercase font-black">
                    Ready to Download
                  </p>
                </div>
              </div>
              <Button
                variant="primary"
                className="px-6 py-2 text-sm font-bold shadow-md"
                onClick={handleDownload}
              >
                Download
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 flex justify-end gap-3 border-t border-gray-100">
          <Button variant="reset" onClick={onClose} className="px-8 py-2">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NoticePreviewModal;
