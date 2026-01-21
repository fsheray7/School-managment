import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaTrash, FaEye, FaTimes } from 'react-icons/fa'
import teachersData from '../../../data/teachers/teacher'

const Teachers = () => {
    const navigate = useNavigate()
    const [selectedTeacher, setSelectedTeacher] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleViewDetails = (teacher) => {
        setSelectedTeacher(teacher)
        setIsModalOpen(true)
    }

    const closeModal = () => {
        setIsModalOpen(false)
        setSelectedTeacher(null)
    }

    return (
        <section className="flex flex-col items-center justify-start w-full bg-white min-h-screen gap-4 px-4 pb-10 pt-20">

            {/* Header and Add Button */}
            <div className='flex w-full justify-between items-center max-w-6xl'>
                <h1 className="text-md md:text-2xl font-bold text-[#0C46C4]">Teachers Management</h1>
                <button onClick={() => navigate("/add-teacher")} className='border-2 border-[#0C46C4] text-[#0C46C4] px-2 py-1 md:px-4 md:py-2 cursor-pointer hover:bg-[#0a3699] hover:scale-105 transition-all duration-300 rounded-md font-medium shadow-md'>
                    + Add Teacher
                </button>
            </div>

            {/* Teachers Table */}
            <div className="w-full max-w-6xl mt-4 overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-[#E8F8F6] text-[#0C46C4] uppercase text-xs font-bold">
                        <tr>
                            <th className="px-6 py-4">Full Name</th>
                            <th className="px-6 py-4 hidden md:table-cell">Email</th>
                            <th className="px-6 py-4 hidden md:table-cell">Subject</th>
                            <th className="px-6 py-4 hidden lg:table-cell">Section</th>
                            <th className="px-6 py-4 hidden lg:table-cell">Contact</th>
                            <th className="px-6 py-4 ">Type</th>
                            <th className="px-6 py-4 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                        {teachersData.map((teacher) => (
                            <tr key={teacher.id} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-4 font-medium text-gray-900">{teacher.fullName}</td>
                                <td className="px-4 py-2 md:px-6 md:py-4 text-gray-500 hidden md:table-cell">{teacher.email}</td>
                                <td className="px-4 py-2 md:px-6 md:py-4 hidden md:table-cell">{teacher.subject}</td>
                                <td className="px-4 py-2 md:px-6 md:py-4 hidden lg:table-cell">{teacher.section}</td>
                                <td className="px-4 py-2 md:px-6 md:py-4 hidden lg:table-cell">{teacher.contact}</td>
                                <td className="px-4 py-2 md:px-6 md:py-4 ">
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${teacher.type === 'Regular' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {teacher.type}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center gap-2 items-center">
                                        {/* View Details Button - Visible on Small Screens */}
                                        <button
                                            onClick={() => handleViewDetails(teacher)}
                                            className="lg:hidden text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
                                            title="View Details"
                                        >
                                            <FaEye size={16} />
                                        </button>

                                        <button className="text-blue-600 hover:text-blue-800 transition-colors p-2 rounded-full hover:bg-blue-50" title="Edit">
                                            <FaEdit size={16} />
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 transition-colors p-2 rounded-full hover:bg-red-50" title="Delete">
                                            <FaTrash size={16} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {teachersData.length === 0 && (
                    <div className="p-8 text-center text-gray-500">
                        No teachers found.
                    </div>
                )}
            </div>

            {/* View Details Modal */}
            {isModalOpen && selectedTeacher && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-md relative overflow-hidden animate-fade-in">
                        <div className="bg-[#E8F8F6] px-6 py-4 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-[#0C46C4]">Teacher Details</h3>
                            <button onClick={closeModal} className="text-gray-500 hover:text-gray-700">
                                <FaTimes size={20} />
                            </button>
                        </div>
                        <div className="p-6 flex flex-col gap-4">
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Full Name</span>
                                <span className="text-gray-800 font-medium">{selectedTeacher.fullName}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Email</span>
                                <span className="text-gray-800">{selectedTeacher.email}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Subject</span>
                                <span className="text-gray-800">{selectedTeacher.subject}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Section</span>
                                <span className="text-gray-800">{selectedTeacher.section}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Contact</span>
                                <span className="text-gray-800">{selectedTeacher.contact}</span>
                            </div>
                            <div className="flex flex-col gap-1">
                                <span className="text-xs text-gray-500 uppercase font-bold">Type</span>
                                <div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${selectedTeacher.type === 'Regular' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                                        {selectedTeacher.type}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex justify-end">
                            <button
                                onClick={closeModal}
                                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors font-medium text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </section>
    )
}

export default Teachers