// components/assignments/AssignmentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AssignmentList = ({ courseId }) => {
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await axios.get(`/api/assignments?courseId=${courseId}`);
        setAssignments(response.data);
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    };

    fetchAssignments();
  }, [courseId]);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Tareas del Curso</h2>
      {assignments.map((assignment) => (
        <div key={assignment._id} className="border p-4 rounded-lg">
          <h3 className="text-xl font-semibold">{assignment.title}</h3>
          <p className="text-gray-600">{assignment.description}</p>
          <div className="mt-2">
            <p>Fecha de entrega: {new Date(assignment.dueDate).toLocaleDateString()}</p>
            <p>Puntuación máxima: {assignment.maxScore}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AssignmentList;