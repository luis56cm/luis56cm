// components/dashboard/StudentDashboard.js
import React, { useState, useEffect } from 'react';
import { AssignmentList } from '../assignments';
import Calendar from '../common/Calendar';
import NotificationCenter from '../notifications/NotificationCenter';
import { getCourses, getNotifications } from '../../services/api';

const StudentDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [coursesData, notificationsData] = await Promise.all([
          getCourses(),
          getNotifications()
        ]);
        setCourses(coursesData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
      }
    };

    loadDashboardData();
  }, []);

  return (
    <div className="flex flex-col space-y-6">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Estudiante</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="md:col-span-2 space-y-6">
            {/* Cursos Activos */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Mis Cursos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {courses.map(course => (
                  <div 
                    key={course._id}
                    className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedCourse(course)}
                  >
                    <h3 className="font-medium">{course.name}</h3>
                    <p className="text-sm text-gray-500">{course.professor}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tareas Pendientes */}
            {selectedCourse && (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">Tareas del Curso</h2>
                <AssignmentList courseId={selectedCourse._id} />
              </div>
            )}
          </div>

          {/* Panel Lateral */}
          <div className="space-y-6">
            {/* Notificaciones */}
            <div className="bg-white shadow rounded-lg p-6">
              <NotificationCenter notifications={notifications} />
            </div>

            {/* Calendario */}
            <div className="bg-white shadow rounded-lg p-6">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;