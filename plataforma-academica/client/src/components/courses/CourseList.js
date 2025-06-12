import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '../ui/card';
import { Link } from 'react-router-dom';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null); // Estado para manejar errores

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch('/api/courses');
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourses(data);
      } catch (error) {
        setError(error.message); // Capturar error si falla la solicitud
      }
    };
    fetchCourses();
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Courses</CardTitle>
        <Link to="/courses/create">
          <Button variant="contained">Create Course</Button>
        </Link>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar mensaje de error */}
        {courses.map((course) => (
          <div key={course._id} className="mb-4">
            <h3>{course.name}</h3>
            <p>{course.description}</p>
            <p>Instructor: {course.instructor}</p>
            <Link to={`/courses/${course._id}`}>
              <Button variant="outlined">View Course</Button>
            </Link>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default CourseList;
