// client/src/services/coursesService.js
import axios from 'axios';

// Define la URL base de la API
const API_URL = 'http://localhost:5000/api/courses';

// Obtener todos los cursos
export const getAllCourses = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los cursos:', error);
    throw error;
  }
};

// Obtener un curso por ID
export const getCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el curso:', error);
    throw error;
  }
};

// Crear un nuevo curso
export const createCourse = async (courseData) => {
  try {
    const response = await axios.post(API_URL, courseData);
    return response.data;
  } catch (error) {
    console.error('Error al crear el curso:', error);
    throw error;
  }
};

// Actualizar un curso
export const updateCourse = async (id, courseData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, courseData);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar el curso:', error);
    throw error;
  }
};

// Eliminar un curso
export const deleteCourse = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el curso:', error);
    throw error;
  }
};
