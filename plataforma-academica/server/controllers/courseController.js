// server/controllers/courseController.js
const Course = require('../models/Course');
const User = require('../models/User');

// Crear un nuevo curso
exports.createCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;
    const course = new Course({ name, description, instructor });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Obtener todos los cursos
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Obtener un curso por ID
exports.getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Actualizar un curso
exports.updateCourse = async (req, res) => {
  try {
    const { name, description, instructor } = req.body;
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { name, description, instructor },
      { new: true, runValidators: true }
    );
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json(course);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Eliminar un curso
exports.deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }
    res.json({ message: 'Curso eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Inscribir a un estudiante en un curso
exports.enrollInCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.body.studentId;

    // Buscar el curso por ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Verificar si el estudiante ya está inscrito
    if (course.students.includes(studentId)) {
      return res.status(400).json({ message: 'El estudiante ya está inscrito en este curso' });
    }

    // Inscribir al estudiante
    course.students.push(studentId);
    await course.save();

    // También agregar el curso al array de cursos del estudiante
    const student = await User.findById(studentId);
    student.courses.push(courseId);
    await student.save();

    res.status(200).json({ message: 'Inscripción exitosa' });
  } catch (err) {
    res.status(500).json({ message: 'Error al inscribir al estudiante', error: err.message });
  }
};

// Dar de baja a un estudiante de un curso
exports.unenrollFromCourse = async (req, res) => {
  try {
    const courseId = req.params.id;
    const studentId = req.body.studentId; 

    // Buscar el curso por ID
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: 'Curso no encontrado' });
    }

    // Verificar si el estudiante está inscrito
    if (!course.students.includes(studentId)) {
      return res.status(400).json({ message: 'El estudiante no está inscrito en este curso' });
    }

    // Eliminar al estudiante del curso
    course.students.pull(studentId);
    await course.save();

    // Eliminar el curso del array de cursos del estudiante
    const student = await User.findById(studentId);
    student.courses.pull(courseId);
    await student.save();

    res.status(200).json({ message: 'El estudiante se ha dado de baja del curso' });
  } catch (err) {
    res.status(500).json({ message: 'Error al dar de baja al estudiante', error: err.message });
  }
};
