import React from "react";
import { FaPrint } from "react-icons/fa";
import Button from "./Button";
import { useSettings } from "../../context/SettingsContext";

const PreviewModal = ({
  isOpen,
  onClose,
  title = "Results Preview",
  data = [], // ✅ Default empty array
  columns = [], // ✅ Default empty array
  headerInfo,
  footerText,
  onPrint,
}) => {
  if (!isOpen) return null;
  

  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  // ✅ Safe check for data array
  const hasData = Array.isArray(data) && data.length > 0;


  const { schoolLogo, schoolName } = useSettings();
  // Safely extract details from headerInfo
  const getDetail = (label) => headerInfo?.details?.find(d => d.label === label)?.value || 'N/A';

  const classTeacher = getDetail("Class Teacher");
  const studentClass = getDetail("Class");
  const section = getDetail("Section");
  const subject = getDetail("Subject");

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto print:shadow-none print:bg-white print:max-w-none print:w-full print:h-auto print:overflow-visible">
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b print:hidden">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <div className="flex gap-2">
            <Button
              onClick={handlePrint}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <FaPrint />
              Print
            </Button>
            <Button
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
            >
              Close
            </Button>
          </div>
        </div>

        {/* Printable Content */}
        <div className="p-6 print:p-0">
          
          {/* Header Info */}
<header className="flex flex-col mb-6">
  {/* Top Row - Logo and Title */}
  <div className="flex justify-between items-center text-center mb-4">
    <div className="flex flex-col justify-center items-center">
      <img 
        src={schoolLogo || 'https://via.placeholder.com/64'} 
        alt="School Logo" 
        className="w-16 object-contain h-16 mr-4" 
        onError={(e) => e.target.src = 'https://via.placeholder.com/64'}
      />
      <h1 className="text-xl font-bold text-black">{schoolName || 'School Name'}</h1>
    </div>
    <div>
      <h2 className="text-xl font-semibold text-black">Student Result Card</h2>
      <p className="text-lg text-black">Academic Year 2024-2025</p>
    </div>
  </div>

  {/* Bottom Row - Teacher, Class, Section, Subject */}
  <div className="border-t border-b border-gray-300 py-3 bg-gray-50 print:bg-gray-100">
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
      <div>
        <p className="text-xs text-gray-600 font-medium">Class Teacher</p>
        <p className="text-sm font-semibold text-gray-800">{classTeacher}</p>
      </div>
      <div>
        <p className="text-xs text-gray-600 font-medium">Class</p>
        <p className="text-sm font-semibold text-gray-800">{studentClass}</p>
      </div>
      <div>
        <p className="text-xs text-gray-600 font-medium">Section</p>
        <p className="text-sm font-semibold text-gray-800">{section}</p>
      </div>
      <div>
        <p className="text-xs text-gray-600 font-medium">Subject</p>
        <p className="text-sm font-semibold text-gray-800">{subject}</p>
      </div>
    </div>
  </div>
</header>

          {/* Results Table */}
          <div className="overflow-x-auto print:overflow-visible">
            <table className="w-full border-collapse border border-gray-300 print:border-black">
              <thead>
                <tr className="bg-gray-100 print:bg-white">
                  {Array.isArray(columns) && columns.map((col, index) => (
                    <th
                      key={index}
                      className="border border-gray-300 print:border-black px-4 py-2 text-left font-semibold print:px-2 print:py-1 print:text-sm"
                    >
                      {col.header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hasData ? (
                  data.map((row, rowIndex) => (
                    <tr
                      key={rowIndex}
                      className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50 print:bg-white"}
                    >
                      {Array.isArray(columns) && columns.map((col, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-300 print:border-black px-1 py-2 print:px-2 print:py-1 print:text-sm"
                        >
                          {col.render ? col.render(row) : row?.[col.key] ?? "-"}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td 
                      colSpan={columns?.length || 1} 
                      className="border border-gray-300 px-1 py-8 text-center text-gray-500"
                    >
                      No data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          {footerText && (
            <div className="mt-6 text-center text-sm text-gray-600">
              <p>{footerText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;