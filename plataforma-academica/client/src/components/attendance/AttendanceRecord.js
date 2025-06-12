// client/src/components/attendance/AttendanceRecord.js
import React, { useState } from 'react';
import axios from 'axios';

const AttendanceRecord = ({ courseId, students }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);

  const handleAttendanceChange = (studentId, status) => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const promises = Object.entries(attendance).map(([studentId, status]) =>
        axios.post(`/api/courses/${courseId}/attendance`, {
          studentId,
          date: selectedDate,
          status
        })
      );

      await Promise.all(promises);
      // Limpiar el formulario o mostrar mensaje de éxito
    } catch (err) {
      console.error('Error al guardar asistencia:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Fecha:
        </label>
        <input
          type="date"
          value={selectedDate.toISOString().split('T')[0]}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
        />
      </div>

      <div className="space-y-2">
        {students.map(student => (
          <div key={student._id} className="flex items-center space-x-4">
            <span>{student.name}</span>
            <select
              value={attendance[student._id] || ''}
              onChange={(e) => handleAttendanceChange(student._id, e.target.value)}
              className="rounded-md border-gray-300 shadow-sm"
            >
              <option value="">Seleccionar</option>
              <option value="present">Presente</option>
              <option value="absent">Ausente</option>
              <option value="late">Tarde</option>
            </select>
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={saving}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        {saving ? 'Guardando...' : 'Guardar Asistencia'}
      </button>
    </form>
  );
};

export default AttendanceRecord;