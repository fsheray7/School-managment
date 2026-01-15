import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import WelcomePage from './pages/WelcomePage'
import ProfileSelection from './layout/loginlayout/ProfileSelection'
import TeacherDashboard from './pages/teacherpages/TeacherDashboard'
import TeacherLayout from './layout/teacherlayout/TeacherSec'
import AddAccount from './components/teachercomp/AddAcoount'
import AddClasses from './components/teachercomp/AddClasses'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/select-profile" element={<ProfileSelection />} />
        <Route path="/" element={<WelcomePage />} />
        <Route path="/teacher-dashboard" element={<TeacherLayout />} />
        <Route path='/add-account' element= {<AddAccount />} />
        <Route path ='/add-classes' element= {<AddClasses />} />
      </Routes>
    </Router>
  )
}

export default App
