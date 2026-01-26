import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const ActionButtons = ({ onView, onEdit, onDelete, itemName }) => {
    return (
        <div className="flex justify-center gap-2 items-center">
            {onView && (
                <button
                    onClick={onView}
                    className="text-blue-500 hover:text-blue-700 transition-colors p-2 cursor-pointer rounded-full hover:bg-blue-50"
                    title={`View ${itemName || 'Details'}`}
                >
                    <FaEye size={16} />
                </button>
            )}

            {onEdit && (
                <button 
                    onClick={onEdit}
                    className="text-green-600 hover:text-green-800 transition-colors p-2 cursor-pointer rounded-full hover:bg-green-50" 
                    title={`Edit ${itemName || 'Item'}`}
                >
                    <FaEdit size={16} />
                </button>
            )}

            {onDelete && (
                <button 
                    onClick={onDelete}
                    className="text-red-500 hover:text-red-800 transition-colors p-2 cursor-pointer rounded-full hover:bg-red-50" 
                    title={`Delete ${itemName || 'Item'}`}
                >
                    <FaTrash size={16} />
                </button>
            )}
        </div>
    );
};

export default ActionButtons;
