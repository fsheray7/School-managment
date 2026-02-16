import React from 'react';
import { FaSave, FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border-t-8 border-blue-500 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header/Icon Section */}
                <div className="bg-blue-50 p-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FaSave size={32} className="text-blue-500" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-500 text-center mt-2 text-sm px-4">
                        {message}
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 bg-gray-50 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-medium hover:bg-gray-100 cursor-pointer transition-colors text-sm"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="flex-1 px-4 py-2.5 rounded-xl bg-blue-500 text-white font-medium hover:bg-blue-600 transition-shadow hover:shadow-lg shadow-blue-200 cursor-pointer flex items-center justify-center gap-2 text-sm"
                    >
                        <FaSave size={14} />
                        OK
                    </button>
                </div>

                {/* Close Button Top-Right */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 cursor-pointer transform duration-200"
                >
                    <FaTimes size={18} />
                </button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
