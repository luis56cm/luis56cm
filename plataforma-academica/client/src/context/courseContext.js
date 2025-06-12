// client/src/context/courseContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de los cursos
const CourseContext = createContext();

// Proveedor del contexto
export const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  // Función para obtener los cursos
  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/courses');
      const data = await response.json();
      setCourses(data);  // Establecer la lista de cursos
    } catch (error) {
      console.error("Error al obtener los cursos:", error);
    }
  };

  // Función para seleccionar un curso
  const selectCourse = (course) => {
    setSelectedCourse(course);  // Establecer el curso seleccionado
  };

  return (
    <CourseContext.Provider value={{ courses, selectedCourse, fetchCourses, selectCourse }}>
      {children}
    </CourseContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useCourses = () => {
  return useContext(CourseContext);
};
