// client/src/components/schedule/ScheduleView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ScheduleView = () => {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = [
    'Domingo', 'Lunes', 'Martes', 'Miércoles', 
    'Jueves', 'Viernes', 'Sábado'
  ];

  useEffect(() => {
    fetchSchedules();
  }, []);

  const fetchSchedules = async () => {
    try {
      const response = await axios.get('/api/schedules');
      setSchedules(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error al cargar horarios:', err);
      setLoading(false);
    }
  };

  if (loading) return <div>Cargando horarios...</div>;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Hora
            </th>
            {daysOfWeek.map(day => (
              <th 
                key={day} 
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {day}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {/* Renderizar horarios por hora y día */}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleView;
