// client/src/components/courses/CourseDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../ui/card';
import { Link } from 'react-router-dom';
import { AssignmentList, CreateAssignment, SubmitAssignment } from '../assignments';  // Importación de los componentes de tareas

const CourseDetail = () => {
  const { id } = useParams();  // Obtener el ID del curso desde la URL
  const [course, setCourse] = useState(null);

  // Traer la información del curso usando el ID
  useEffect(() => {
    const fetchCourse = async () => {
      const response = await fetch(`/api/courses/${id}`);
      const data = await response.json();
      setCourse(data);
    };
    fetchCourse();
  }, [id]);

  // Si aún no se ha cargado el curso, mostrar un mensaje de carga
  if (!course) {
    return <p>Loading...</p>;
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{course.name}</CardTitle>
        <Link to="/courses">
          <Button variant="outlined">Back to Courses</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <h3>{course.name}</h3>
        <p>{course.description}</p>
        <p><strong>Instructor:</strong> {course.instructor}</p>
        <p><strong>Duration:</strong> {course.duration} hours</p>
        <p><strong>Category:</strong> {course.category}</p>
        {/* Puedes agregar más campos si lo deseas */}

        {/* Aquí agregas los componentes relacionados con las tareas */}
        <AssignmentList courseId={course._id} /> {/* Muestra las tareas del curso */}
        <CreateAssignment courseId={course._id} onAssignmentCreated={(newAssignment) => {
          // Actualizar la lista de tareas con la nueva tarea creada
          setCourse(prevCourse => ({
            ...prevCourse,
            assignments: [...prevCourse.assignments, newAssignment]
          }));
        }} /> {/* Formulario para crear nuevas tareas */}

        {/* Aquí puedes agregar lógica para mostrar el formulario de envío de tareas si es necesario */}
        {/* Ejemplo de cómo agregar SubmitAssignment */}
        {/* <SubmitAssignment assignmentId={/* Aquí pasa el ID de la tarea correspondiente */}
        
        <Link to={`/courses/${course._id}/edit`}>
          <Button variant="contained">Edit Course</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default CourseDetail;
