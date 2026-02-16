import React from 'react';
import { FaPrint } from 'react-icons/fa';
import Button from './Button';
import { useSettings } from '../../context/SettingsContext';

const ResultPreviewModal = ({ isOpen, onClose, studentsResults }) => {
  if (!isOpen) return null;

  const { schoolLogo, schoolName } = useSettings();

  const handlePrint = () => {
    window.print();
  };

  // Helper function for grade display
  const getGradeFromPercentage = (percentage) => {
    if (percentage >= 80) return "A+";
    if (percentage >= 70) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    if (percentage >= 40) return "D";
    return "F";
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-auto print:shadow-none print:bg-white print:max-w-none print:w-full print:h-auto print:overflow-visible">
        
        {/* Modal Header - Hidden on Print */}
        <div className="flex justify-between items-center p-6 border-b print:hidden">
          <h2 className="text-xl font-bold text-gray-800">Result Preview</h2>
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

        {/* Printable Content - Original Design */}
        <div className="p-6 print:p-0">
          {studentsResults.map((student) => {
            // Calculate totals from subjects array
            const totalMarks = student.subjects?.reduce((sum, s) => sum + (Number(s.total) || 0), 0) || 0;
            const obtainedMarks = student.subjects?.reduce((sum, s) => sum + (Number(s.obtained) || 0), 0) || 0;
            const avgPercentage = totalMarks > 0 ? ((obtainedMarks / totalMarks) * 100).toFixed(2) : 0;
            
            // Get grade from percentage
            const overallGrade = getGradeFromPercentage(Number(avgPercentage));

            return (
              <div key={student.studentId} className="result-card print:page-break-after-always mb-8 print:mb-0">
                
                {/* School Header - Original Design */}
                <header className="flex justify-between ites-center text-center mb-6">
                  <div className="flex flex-col justify-center items-center mb-4">
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
                </header>

                {/* Student Information Section - Original Design */}
                <section className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <p><strong>Student ID:</strong> {student.studentId || 'N/A'}</p>
                    <p><strong>Student Name:</strong> {student.name || 'N/A'}</p>
                    <p><strong>Father Name:</strong> {student.fatherName || 'N/A'}</p>
                    <p><strong>Class:</strong> {student.class || 'N/A'}</p>
                    <p><strong>Section:</strong> {student.section || 'N/A'}</p>
                    <p><strong>Subject:</strong> {student.subjects?.[0]?.name || 'N/A'}</p>
                  </div>
                  <div className="relative">
                    <p><strong>Roll Number:</strong> {student.rollNo || 'N/A'}</p>
                    <p><strong>Date of Issue:</strong> {new Date().toLocaleDateString()}</p>
                    {student.photo && (
                      <img 
                        src={student.photo} 
                        alt="Student" 
                        className="absolute top-0 right-0 w-20 h-20 border border-black rounded-full object-cover"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    )}
                  </div>
                </section>

                {/* Term-wise Summary Cards - New Addition but Clean Design */}
                {student.termSummary && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="flex flex-col items-start p-3 rounded">
                      <h3 className="font-bold  text-center mb-2">First Terminal</h3>
                      <div className="flex items-start">

                      <p><strong>Obtain/Total Marks:</strong> {student.termSummary.firstTerm.obtained} / {student.termSummary.firstTerm.total}</p>
                      <p><strong>Percentage:</strong> {student.termSummary.firstTerm.percentage}%</p>
                      <p><strong>Grade:</strong> {student.termSummary.firstTerm.grade}</p>
                      <p><strong>Status:</strong> {student.termSummary.firstTerm.status}</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-start p-3 rounded">
                      <h3 className="font-bold text-center mb-2">Second Terminal</h3>
                      <div className="flex items-start">

                      <p><strong>Obtain/Total Marks:</strong> {student.termSummary.secondTerm.obtained} / {student.termSummary.secondTerm.total}</p>
                      <p><strong>Percentage:</strong> {student.termSummary.secondTerm.percentage}%</p>
                      <p><strong>Grade:</strong> {student.termSummary.secondTerm.grade}</p>
                      <p><strong>Status:</strong> {student.termSummary.secondTerm.status}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Marks Table - Original Design with Fixed Data */}
                <section className="mb-6">
                  <table className="w-full border-collapse border border-black">
                    <thead>
                      <tr className="bg-gray-100">
                        <th className="border border-black px-4 py-2 text-left font-semibold">Subject</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">1st Term</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">2nd Term</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">Total Marks</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">Obtained Marks</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">Percentage</th>
                        <th className="border border-black px-4 py-2 text-left font-semibold">Grade</th>
                      </tr>
                    </thead>
                    <tbody>
                      {student.subjects?.map((subject, idx) => {
                        const subjectPercentage = subject.total > 0 
                          ? ((Number(subject.obtained) / Number(subject.total)) * 100).toFixed(1) 
                          : 0;
                        const subjectGrade = getGradeFromPercentage(Number(subjectPercentage));
                        
                        return (
                          <tr key={idx}>
                            <td className="border border-black px-4 py-2">{subject.name}</td>
                            <td className="border border-black px-4 py-2">{subject.firstTermObtained || '-'}/{subject.firstTermTotal || '-'}</td>
                            <td className="border border-black px-4 py-2">{subject.secondTermObtained || '-'}/{subject.secondTermTotal || '-'}</td>
                            <td className="border border-black px-4 py-2">{subject.total}</td>
                            <td className="border border-black px-4 py-2">{subject.obtained}</td>
                            <td className="border border-black px-4 py-2">{subjectPercentage}%</td>
                            <td className="border border-black px-4 py-2">{subject.grade || subjectGrade}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                    <tfoot className="bg-gray-200 font-semibold">
                      <tr>
                        <td className="border border-black px-4 py-2">Total / Average</td>
                        <td className="border border-black px-4 py-2">-</td>
                        <td className="border border-black px-4 py-2">-</td>
                        <td className="border border-black px-4 py-2">{totalMarks}</td>
                        <td className="border border-black px-4 py-2">{obtainedMarks}</td>
                        <td className="border border-black px-4 py-2">{avgPercentage}%</td>
                        <td className="border border-black px-4 py-2">{overallGrade}</td>
                      </tr>
                    </tfoot>
                  </table>
                </section>

                {/* Overall Summary Section - Original Design */}
                <section className="border border-black p-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    <p><strong>Total Marks:</strong> {totalMarks}</p>
                    <p><strong>Obtained Marks:</strong> {obtainedMarks}</p>
                    <p><strong>Overall Percentage:</strong> {avgPercentage}%</p>
                    <p><strong>Overall Grade:</strong> {overallGrade}</p>
                    <p><strong>Result:</strong> {Number(avgPercentage) >= 40 ? 'Pass' : 'Fail'}</p>
                    <p><strong>Remarks:</strong> {Number(avgPercentage) >= 40 ? 'Promoted to next class' : 'Needs Improvement'}</p>
                  </div>
                </section>

                {/* Signature Section - Original Design */}
                <section className="grid grid-cols-3 mt-10 gap-4 mb-6">
                  <div className="text-center">
                    <div className="border-b border-black mb-2"></div>
                    <p>Class Teacher Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-black mb-2"></div>
                    <p>Exam Controller Signature</p>
                  </div>
                  <div className="text-center">
                    <div className="border-b border-black mb-2"></div>
                    <p>Principal Signature</p>
                  </div>
                </section>

                {/* Footer - Original Design */}
                <footer className="text-center text-sm text-gray-600">
                  <p>This is a computer generated result card.</p>
                </footer>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ResultPreviewModal;