import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import ProfileSelection from "./pages/ProfileSelection";
import TeacherDashboard from "./pages/teacher/TeacherDashboard";
import AddAccount from "./pages/teacher/AddAcoount";
import AddClasses from "./pages/teacher/AddClasses";
import HomeWork from "./pages/teacher/HomeWork";
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/select-profile" element={<ProfileSelection />} />
        <Route path="/" element={<WelcomePage />} />

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

          {/* Teacher Routes */}
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/homework" element={<HomeWork />} />
          <Route path="/results" element={<Results />} />
          <Route path="/marks" element={<AddMarks />} />
          <Route path="/notice" element={<Notice />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/add-classes" element={<AddClasses />} />
          <Route path="/exam-routine" element={<ExamRoutine />} />

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
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
