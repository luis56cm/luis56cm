// components/dashboard/TeacherDashboard.js
import React, { useState, useEffect } from 'react';
import { CreateAssignment } from '../assignments';
import Calendar from '../common/Calendar';
import NotificationCenter from '../notifications/NotificationCenter';
import { getCourses, getStudents, getNotifications } from '../../services/api';
import { createNotification } from '../../services/api';

const TeacherDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [announcementText, setAnnouncementText] = useState('');
  
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [coursesData, studentsData, notificationsData] = await Promise.all([
          getCourses(),
          getStudents(),
          getNotifications()
        ]);
        setCourses(coursesData);
        setStudents(studentsData);
        setNotifications(notificationsData);
      } catch (error) {
        console.error('Error al cargar el dashboard:', error);
      }
    };

    loadDashboardData();
  }, []);

  const createAnnouncement = async (courseId, message) => {
    try {
      // Crear notificación para todos los estudiantes del curso
      const courseStudents = students.filter(student => 
        student.courses.includes(courseId)
      );
      
      await Promise.all(courseStudents.map(student =>
        createNotification({
          recipient: student._id,
          type: 'announcement',
          title: 'Nuevo Anuncio',
          message,
          courseId
        })
      ));
    } catch (error) {
      console.error('Error al crear el anuncio:', error);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Profesor</h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Panel Principal */}
          <div className="md:col-span-2 space-y-6">
            {/* Cursos */}
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
                    <p className="text-sm text-gray-500">
                      {course.students?.length || 0} estudiantes
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Gestión de Curso */}
            {selectedCourse && (
              <div className="bg-white shadow rounded-lg p-6 space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Crear Nueva Tarea</h2>
                  <CreateAssignment courseId={selectedCourse._id} />
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4">Crear Anuncio</h2>
                  <textarea
                    className="w-full p-2 border rounded"
                    placeholder="Escriba su anuncio aquí..."
                    rows="4"
                    onChange={(e) => setAnnouncementText(e.target.value)}
                  ></textarea>
                  <button
                    className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => createAnnouncement(selectedCourse._id, announcementText)}
                  >
                    Publicar Anuncio
                  </button>
                </div>
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

export default TeacherDashboard;  