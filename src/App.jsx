import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import ProfileSelection from "./pages/ProfileSelection";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import HomeWork from "./pages/teacher/HomeWork";
import AddAttendance from "./pages/teacher/AddAttendance";
import Attendance from "./pages/teacher/Attendance";
import Results from "./pages/teacher/Results";
import AddMarks from "./pages/teacher/AddMarks";
import Notice from "./pages/teacher/Notice";
import Solutions from "./pages/teacher/Solutions";
import AttendanceStudent from "./pages/student/AttendanceStudent";
import HomeWorkStudent from "./pages/student/HomeWork";
import ResultsStudent from "./pages/student/ResultsStudent";
import MarksStudent from "./pages/student/MarksStudent";
import Questions from "./pages/student/Questions";
import AskQuestion from "./pages/student/AskQuestion";
import Answer from "./pages/student/Answer";
import Quiz from "./pages/student/Quiz";
import QuizOption from "./pages/student/QuizOptions";
import QuizMultipleOptions from "./pages/student/QuizMultipleOptions";
import StudentProfile from "./pages/student/StudentProfile";
import ExamRoutine from "./pages/teacher/ExamRoutine";
import ExamRoutineStudent from "./pages/student/ExamRoutineStudent";
import QuizScore from "./pages/student/QuizScore";
import StudentDashboard from "./pages/student/StudentDashboard";
import DashboardLayout from "./components/layout/DashboardLayout";
import AddTeacher from "./features/admin/AddTeacher";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Teachers from "./pages/admin/Teachers";
import StudentsAdmin from "./pages/admin/StudentsAdmin";
import Courses from "./pages/admin/Courses";
import Meetings from "./pages/admin/Meetings";
import Settings from "./pages/admin/Settings";
import AddStudent from "./features/admin/AddStudent";
import AddCourse from "./features/admin/AddCourse";
import GenerateFee from "./features/admin/GenerateFee";
import Finance from "./pages/admin/Finance";
import NoticeAdmin from "./pages/admin/Notice";
import NoticeTeacher from "./pages/teacher/Notice";
import Classes from "./pages/admin/Classes";
import AddClass from "./features/admin/AddClass";
import StudentPromotion from "./pages/admin/StudentPromotion";
import Login from "./components/login/Login";
import SuperAdminDashboard from "./pages/super-admin/SuperAdminDashboard";
import Admins from "./pages/super-admin/Admins";
import Revenue from "./pages/super-admin/Revenue";
import SuperAdminSettings from "./pages/super-admin/Settings";

import AddAdmin from "./pages/super-admin/AddAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/select-profile" element={<ProfileSelection />} />
        <Route path="/" element={<WelcomePage />} />

        {/* Super admin route */}
        <Route path="/super-admin" element={<Login role="super-admin" />} />

        {/* Unified Layout for All Roles */}
        <Route element={<DashboardLayout />}>
          {/* Admin Routes */}
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/students" element={<StudentsAdmin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/add-teacher" element={<AddTeacher />} />
          <Route path="/add-student" element={<AddStudent />} />
          <Route path="/add-course" element={<AddCourse />} />
          <Route path="/generate-fee" element={<GenerateFee />} />
          <Route path="/finance" element={<Finance />} />
          <Route path="/notice-admin" element={<NoticeAdmin />} />
          <Route path="/classes" element={<Classes />} />
          <Route path="/add-class" element={<AddClass />} />
          <Route path="/student-promotion" element={<StudentPromotion />} />

          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/add-attendance" element={<AddAttendance />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/homework" element={<HomeWork />} />
          <Route path="/results" element={<Results />} />
          <Route path="/marks" element={<AddMarks />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/exam-routine" element={<ExamRoutine />} />
          <Route path="/notice-teacher" element={<NoticeTeacher />} />

          {/* Student Routes */}
          <Route path="/student-dashboard" element={<StudentDashboard />} />
          <Route path="/attendance-student" element={<AttendanceStudent />} />
          <Route path="/homework-student" element={<HomeWorkStudent />} />
          <Route path="/results-student" element={<ResultsStudent />} />
          <Route path="/marks-student" element={<MarksStudent />} />
          <Route path="/questions" element={<Questions />} />
          <Route path="/ask-question" element={<AskQuestion />} />
          <Route path="/answer" element={<Answer />} />
          <Route
            path="/exam-routine-student"
            element={<ExamRoutineStudent />}
          />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/quizoptions" element={<QuizOption />} />
          <Route
            path="/quiz-multiple-options"
            element={<QuizMultipleOptions />}
          />
          <Route path="/quiz-score" element={<QuizScore />} />
          <Route path="/student-profile" element={<StudentProfile />} />

          {/* Super Admin Routes */}
          <Route
            path="/super-admin-dashboard"
            element={<SuperAdminDashboard />}
          />
          <Route path="/super-admin-admins" element={<Admins />} />
          <Route path="/super-admin-revenue" element={<Revenue />} />
          <Route
            path="/super-admin-settings"
            element={<SuperAdminSettings />}
          />
          <Route path="/super-admin-add-admin" element={<AddAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
