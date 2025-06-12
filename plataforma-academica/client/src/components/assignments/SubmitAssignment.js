// components/assignments/SubmitAssignment.js
import React, { useState } from 'react';
import axios from 'axios';

const SubmitAssignment = ({ assignmentId }) => {
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      // Aquí deberías primero subir el archivo a tu servicio de almacenamiento
      // y luego enviar la URL del archivo al backend
      const fileUrl = 'URL_DEL_ARCHIVO_SUBIDO';
      await axios.post(`/api/assignments/${assignmentId}/submit`, { fileUrl });
      // Mostrar mensaje de éxito
    } catch (error) {
      console.error('Error al enviar la tarea:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Archivo de la tarea
        </label>
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="mt-1 block w-full"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Enviar Tarea
      </button>
    </form>
  );
};

export default SubmitAssignment;