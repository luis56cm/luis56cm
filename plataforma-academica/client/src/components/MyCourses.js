// src/components/MyCourses.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyCourses = () => {
  const [courses, setCourses] = useState([]);
  const studentId = 'ID_DEL_ESTUDIANTE'; // Asegúrate de tener el ID real del estudiante, quizás desde el contexto o el login

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // Obtener los cursos en los que el estudiante está inscrito
        const response = await axios.get(`/api/users/${studentId}/courses`);
        setCourses(response.data);
      } catch (error) {
        console.error('Error al obtener los cursos:', error);
      }
    };

    fetchCourses();
  }, [studentId]);

  // Función para manejar la baja de un curso
  const unenrollFromCourse = async (courseId) => {
    try {
      await axios.put(`/api/courses/${courseId}/unenroll`, { studentId });
      setCourses(courses.filter(course => course._id !== courseId)); // Actualizar la lista de cursos
      alert('Te has dado de baja del curso');
    } catch (error) {
      console.error('Error al dar de baja del curso:', error);
    }
  };

  return (
    <div>
      <h2>Mis Cursos</h2>
      <ul>
        {courses.map(course => (
          <li key={course._id}>
            <Link to={`/courses/${course._id}`}>{course.name}</Link>
            <button onClick={() => unenrollFromCourse(course._id)}>Darse de baja</button>
          </li>
        ))}
      </ul>
      <Link to="/courses/enroll">Inscribirse en nuevos cursos</Link>
    </div>
  );
};

export default MyCourses;
