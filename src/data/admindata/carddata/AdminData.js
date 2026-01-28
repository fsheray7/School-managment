import { FaUserGraduate } from "react-icons/fa";
import { FaUserTie } from 'react-icons/fa6';
import studentsData from "../students/students";
import teachersData from "../../teachers/teacher";

const totalStudents = studentsData.length;
const totalTeachers = teachersData.length;
const pvtTeachers = teachersData.filter(teacher => teacher.type === "Contractual").length;

const data = [
    {
        id: 1,
        title: "Students",
        icon: FaUserGraduate ,
        total: totalStudents.toString(),
    },
    {
        id: 2,
        title: "Teachers",
        icon: FaUserTie ,
        total: totalTeachers.toString(),
    },
    {
        id: 3,
        title: "Pvt Teachers",
        icon: FaUserTie,
        total: pvtTeachers.toString(),
    }
]


export default data;