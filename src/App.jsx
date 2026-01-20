import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./pages/WelcomePage";
import ProfileSelection from "./layout/loginlayout/ProfileSelection";
import TeacherDashboard from "./pages/teacherpages/TeacherDashboard";
import TeacherLayout from "./layout/teacherlayout/TeacherSec";
import AddAccount from "./components/teachercomp/AddAcoount";
import AddClasses from "./components/teachercomp/AddClasses";
import HomeWork from "./components/teachercomp/HomeWork";
import Attendance from "./components/teachercomp/Attendance";
import Results from "./components/teachercomp/Results";
import AddMarks from "./components/teachercomp/AddMarks";
import Notice from "./components/teachercomp/Notice";
import Solutions from "./components/teachercomp/Solutions";
import StudentLayout from "./layout/student-layout/Studentlayout";
import AttendanceStudent from "./components/studentcomp/AttendanceStudent";
import HomeWorkStudent from "./components/studentcomp/HomeWork";
import ResultsStudent from "./components/studentcomp/ResultsStudent";
import MarksStudent from "./components/studentcomp/MarksStudent";
import Questions from "./components/studentcomp/Questions";
import AskQuestion from "./components/studentcomp/AskQuestion";
import Answer from "./components/studentcomp/Answer";
import Quiz from "./components/studentcomp/Quiz";
import QuizOption from "./components/studentcomp/QuizOptions";
import QuizMultipleOptions from "./components/studentcomp/QuizMultipleOptions";
import StudentProfile from "./pages/studentpages/StudentProfile";
import ExamRoutine from "./components/teachercomp/ExamRoutine";
import ExamRoutineStudent from "./components/studentcomp/ExamRoutineStudent";
import QuizScore from "./components/studentcomp/QuizScore";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/select-profile" element={<ProfileSelection />} />
        <Route path="/" element={<WelcomePage />} />

        {/* Teacher Section Routes */}
        <Route path="/teacher-dashboard" element={<TeacherLayout />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/homework" element={<HomeWork />} />
        <Route path="/results" element={<Results />} />
        <Route path="/marks" element={<AddMarks />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/add-account" element={<AddAccount />} />
        <Route path="/add-classes" element={<AddClasses />} />
        <Route path="/exam-routine" element={<ExamRoutine />} />


        {/* Student Section Routes */}

        <Route path="/student-dashboard" element={<StudentLayout />} />
        <Route path="/attendance-student" element={<AttendanceStudent />} />
        <Route path="/homework-student" element={<HomeWorkStudent />} />
        <Route path="/results-student" element={<ResultsStudent />} />
        <Route path="/marks-student" element={<MarksStudent />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/ask-question" element={<AskQuestion />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/exam-routine-student" element={<ExamRoutineStudent />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/quizoptions" element={<QuizOption />} />
        <Route
          path="/quiz-multiple-options"
          element={<QuizMultipleOptions />}
        />
        <Route path ='/quiz-score' element= {<QuizScore />} />
        <Route path="/student-profile" element={<StudentProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
