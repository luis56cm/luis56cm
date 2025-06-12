// components/assignments/CreateAssignment.js
import React, { useState } from 'react';
import axios from 'axios';

const CreateAssignment = ({ courseId, onAssignmentCreated }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    maxScore: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/assignments', {
        ...formData,
        courseId
      });
      onAssignmentCreated(response.data);
      setFormData({ title: '', description: '', dueDate: '', maxScore: '' });
    } catch (error) {
      console.error('Error al crear la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Título</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>
      {/* Agregar campos similares para description, dueDate y maxScore */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Crear Tarea
      </button>
    </form>
  );
};

export default CreateAssignment;