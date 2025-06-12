// src/api.js
import axios from 'axios';

// Base URL de tu servidor backend (ajústalo a tu entorno de desarrollo o producción)
const API_URL = 'http://localhost:5000/api/courses';

// Crear una instancia de Axios para facilitar las solicitudes
const api = axios.create({
  baseURL: API_URL,
});

// Obtener todos los cursos
export const getAllCourses = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    console.error('Error al obtener cursos:', error);
    throw error;
  }
};

// Crear un curso
export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/', courseData);
    return response.data;
  } catch (error) {
    console.error('Error al crear curso:', error);
    throw error;
  }
};

// Inscribir a un estudiante
export const enrollInCourse = async (courseId, studentId) => {
  try {
    const response = await api.post(`/${courseId}/enroll`, { studentId });
    return response.data;
  } catch (error) {
    console.error('Error al inscribir estudiante:', error);
    throw error;
  }
};

// Dar de baja a un estudiante
export const unenrollFromCourse = async (courseId, studentId) => {
  try {
    const response = await api.post(`/${courseId}/unenroll`, { studentId });
    return response.data;
  } catch (error) {
    console.error('Error al dar de baja al estudiante:', error);
    throw error;
  }
};

// Función para obtener las notificaciones
export const getNotifications = () => api.get('/notifications');

export const getCourses = () => {
  return axios.get('/api/courses');
};

export const getStudents = async () => {
  try {
    const response = await axios.get(API_URL); // Reemplaza con tu URL real
    return response.data; // Axios devuelve los datos en `response.data`
  } catch (error) {
    console.error('Error fetching students:', error);
    throw error;
  }
};

// Función para crear una notificación
export const createNotification = async (notification) => {
  try {
    const response = await axios.post('/api/notifications', notification);
    return response.data; // Devuelve la notificación creada o el resultado del servidor
  } catch (error) {
    console.error('Error al crear la notificación:', error);
    throw error; // Permite manejar el error donde se llame a la función
  }
};


export default api;
