import React from "react";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import Button from "./Button";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  showInfo = true,
}) => {
  // Calculate displayed item range
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-col sm:flex-col items-center justify-between gap-2 px-4 py-3 bg-white ">
      {/* Info Section */}
      {showInfo && (
        <div className="text-sm text-gray-600">
          Showing{" "}
          <span className="font-semibold text-gray-800">{startItem}</span> to{" "}
          <span className="font-semibold text-gray-800">{endItem}</span> of{" "}
          <span className="font-semibold text-gray-800">{totalItems}</span>{" "}
          results
        </div>
      )}

      {/* Pagination Controls */}
      <div className="flex items-center gap-1">
        {/* Previous Button */}
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          variant="ghost"
          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 
            ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-600 hover:bg-blue-300 hover:text-blue-500 cursor-pointer"
            }`}
        >
          <IoChevronBack size={18} />
        </Button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span
              key={`ellipsis-${index}`}
              className="w-9 h-9 flex items-center justify-center text-gray-400"
            >
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-7 h-7 rounded-full hover:scale-110 font-medium text-sm transition-all duration-300 cursor-pointer
                ${
                  currentPage === page
                    ? "text-white shadow-md scale-105"
                    : "text-gray-600 hover:brightness-110"
                }`}
              style={
                currentPage === page
                  ? { backgroundColor: "var(--primary-color)" }
                  : {}
              }
            >
              {page}
            </button>
          ),
        )}

        {/* Next Button */}
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          variant="ghost"
          className={`flex items-center justify-center w-9 h-9 rounded-lg transition-all duration-300 
            ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-gray-600 hover:bg-blue-300 hover:text-blue-500 cursor-pointer"
            }`}
        >
          <IoChevronForward size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
