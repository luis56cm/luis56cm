// server/routes/courses.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

// Rutas para cursos CRUD
router.post('/', courseController.createCourse);  // Crear un curso
router.get('/', courseController.getAllCourses);  // Obtener todos los cursos
router.get('/:id', courseController.getCourseById);  // Obtener un curso por ID
router.put('/:id', courseController.updateCourse);  // Actualizar un curso
router.delete('/:id', courseController.deleteCourse);  // Eliminar un curso

// Rutas para inscribir y dar de baja estudiantes
router.post('/:id/enroll', courseController.enrollInCourse);  // Inscribir a un estudiante
router.post('/:id/unenroll', courseController.unenrollFromCourse);  // Dar de baja a un estudiante

module.exports = router;
