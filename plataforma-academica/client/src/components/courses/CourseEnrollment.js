// src/components/CourseEnrollment.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CourseEnrollment = () => {
  const [courses, setCourses] = useState([]);
  const studentId = 'ID_DEL_ESTUDIANTE'; // Asegúrate de tener el ID real del estudiante

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      try {
        const response = await axios.get('/api/courses');  // Obtiene todos los cursos disponibles
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos disponibles:', error);
      }
    };

    fetchAvailableCourses();
  }, []);

  const handleEnroll = async (courseId) => {
    try {
      // Enviar solicitud para inscribir al estudiante en el curso
      await axios.post(`/api/courses/${courseId}/enroll`, { studentId });
      alert('Inscripción exitosa');
    } catch (error) {
      console.error('Error al inscribirse en el curso:', error);
    }
  };

  return (
    <div>
      <h2>Inscribirse en Cursos</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            {course.name} - {course.description}
            <button onClick={() => handleEnroll(course._id)}>Inscribirse</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseEnrollment;

