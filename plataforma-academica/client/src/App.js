import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyCourses from './components/MyCourses';
import CourseEnrollment from './components/courses/CourseEnrollment';
import './App.css';
import { UserProvider } from './context/userContext';
import { CourseProvider } from './context/courseContext';
import Navbar from './components/common/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import HomePage from './components/HomePage';
import StudentDashboard from './components/dashboard/StudentDashboard';
import TeacherDashboard from './components/dashboard/TeacherDashboard';
import CourseList from './components/courses/CourseList';
import CourseDetail from './components/courses/CourseDetail';
import MessageList from './components/messaging/MessageList';
import ComposeMessage from './components/messaging/ComposeMessage';
import ScheduleView from './components/schedule/ScheduleView';
import AttendanceRecord from './components/attendance/AttendanceRecord';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Importar los componentes de los juegos
import GameSection from './components/games/GameSection';
import TRexGame from './components/games/TRexGame';
import WhackAMole from './components/games/WhackAMole';
import MemoryGame from './components/games/MemoryGame';

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CourseProvider>
          <Navbar />
          <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/courses" element={<CourseList />} />
            <Route path="/games" element={<GameSection />} /> {/* Ruta para seleccionar el juego */}

            {/* Rutas de juegos */}
            <Route path="/games/t-rex" element={<TRexGame />} />  {/* Ruta para el juego T-Rex */}
            <Route path="/games/whack-a-mole" element={<WhackAMole />} />  {/* Ruta para Whack-a-Mole */}
            <Route path="/games/memory" element={<MemoryGame />} />  {/* Ruta para Memory Game */}

            {/* Rutas protegidas */}
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<StudentDashboard />} />
              <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/messages" element={<MessageList />} />
              <Route path="/messages/new" element={<ComposeMessage />} />
              <Route path="/schedule" element={<ScheduleView />} />
              <Route path="/attendance/:courseId" element={<AttendanceRecord />} />
              <Route path="/my-courses" element={<MyCourses />} />
              <Route path="/courses/enroll" element={<CourseEnrollment />} />
            </Route>
          </Routes>
        </CourseProvider>
      </UserProvider>
    </div>
  );
}

export default App;

