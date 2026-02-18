import React from 'react';
import { FaSave, FaTimes } from 'react-icons/fa';
import Button from './Button';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white border-t-8 border-[var(--primary-color)] rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header/Icon Section */}
                <div className="bg-blue-50 p-6 flex flex-col items-center">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                        <FaSave size={32} className="text-[var(--primary-color)]" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-500 text-center mt-2 text-sm px-4">
                        {message}
                    </p>
                </div>

                {/* Footer Buttons */}
                <div className="p-4 flex justify-end items-center bg-gray-50 flex gap-3">
                    <Button
                        onClick={onClose}
                        variant='danger'
                      
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onConfirm}
                        variant="success"
                    >
                        <FaSave size={14} />
                        OK
                    </Button>
                </div>

                {/* Close Button Top-Right */}
                <Button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors hover:scale-110 cursor-pointer transform duration-200"
                >
                    <FaTimes size={18} />
                </Button>
            </div>
        </div>
    );
};

export default ConfirmationModal;
