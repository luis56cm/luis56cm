const Assignment = require('../models/Assignment');
const Submission = require('../models/Submission');
const fs = require('fs').promises;

// Crear una nueva tarea
const createAssignment = async (req, res) => {
  try {
    const { title, description, dueDate, courseId, totalPoints } = req.body;
    
    const newAssignment = new Assignment({
      title,
      description,
      dueDate,
      courseId,
      totalPoints,
      createdBy: req.user._id
    });

    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    console.error('Error al crear la tarea:', error);
    res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
  }
};

// Enviar una tarea
const submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { comment } = req.body;
    const studentId = req.user._id;
    
    // Verificar si ya existe una entrega previa
    const existingSubmission = await Submission.findOne({
      assignmentId,
      studentId
    });

    if (existingSubmission) {
      // Si hay un archivo previo, lo eliminamos
      if (existingSubmission.filePath) {
        await fs.unlink(existingSubmission.filePath);
      }
      
      // Actualizamos la entrega existente
      existingSubmission.comment = comment;
      existingSubmission.filePath = req.file ? req.file.path : existingSubmission.filePath;
      existingSubmission.submittedAt = Date.now();
      
      await existingSubmission.save();
      return res.json(existingSubmission);
    }

    // Si no existe una entrega previa, creamos una nueva
    const newSubmission = new Submission({
      assignmentId,
      studentId,
      comment,
      filePath: req.file ? req.file.path : null
    });

    await newSubmission.save();
    res.status(201).json(newSubmission);
  } catch (error) {
    console.error('Error al enviar la tarea:', error);
    res.status(500).json({ message: 'Error al enviar la tarea', error: error.message });
  }
};

// Calificar una tarea
const gradeAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { grade, feedback } = req.body;

    const submission = await Submission.findOne({
      assignmentId,
      studentId
    });

    if (!submission) {
      return res.status(404).json({ message: 'Entrega no encontrada' });
    }

    submission.grade = grade;
    submission.feedback = feedback;
    submission.gradedAt = Date.now();
    submission.gradedBy = req.user._id;

    await submission.save();
    res.json(submission);
  } catch (error) {
    console.error('Error al calificar la tarea:', error);
    res.status(500).json({ message: 'Error al calificar la tarea', error: error.message });
  }
};

// Obtener tareas por curso
const getAssignmentsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const assignments = await Assignment.find({ courseId })
      .populate('createdBy', 'name email')
      .sort({ dueDate: 1 });
    res.json(assignments);
  } catch (error) {
    console.error('Error al obtener las tareas:', error);
    res.status(500).json({ message: 'Error al obtener las tareas', error: error.message });
  }
};

// Obtener una tarea específica
const getAssignmentById = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId)
      .populate('createdBy', 'name email');
    
    if (!assignment) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    res.json(assignment);
  } catch (error) {
    console.error('Error al obtener la tarea:', error);
    res.status(500).json({ message: 'Error al obtener la tarea', error: error.message });
  }
};

// Actualizar una tarea
const updateAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const updates = req.body;
    
    const assignment = await Assignment.findById(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    // Verificar que el profesor que actualiza es el mismo que la creó
    if (assignment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para actualizar esta tarea' });
    }
    
    Object.assign(assignment, updates);
    await assignment.save();
    
    res.json(assignment);
  } catch (error) {
    console.error('Error al actualizar la tarea:', error);
    res.status(500).json({ message: 'Error al actualizar la tarea', error: error.message });
  }
};

// Eliminar una tarea
const deleteAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await Assignment.findById(assignmentId);
    
    if (!assignment) {
      return res.status(404).json({ message: 'Tarea no encontrada' });
    }
    
    // Verificar que el profesor que elimina es el mismo que la creó
    if (assignment.createdBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'No autorizado para eliminar esta tarea' });
    }
    
    // Eliminar todas las entregas asociadas
    await Submission.deleteMany({ assignmentId });
    
    // Eliminar la tarea
    await Assignment.findByIdAndDelete(assignmentId);
    
    res.json({ message: 'Tarea eliminada exitosamente' });
  } catch (error) {
    console.error('Error al eliminar la tarea:', error);
    res.status(500).json({ message: 'Error al eliminar la tarea', error: error.message });
  }
};

module.exports = {
  createAssignment,
  submitAssignment,
  gradeAssignment,
  getAssignmentsByCourse,
  getAssignmentById,
  updateAssignment,
  deleteAssignment
};