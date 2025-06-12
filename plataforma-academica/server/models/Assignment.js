// models/Assignment.js
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  dueDate: { type: Date, required: true },
  maxScore: { type: Number, required: true },
  submissions: [{
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    submissionDate: { type: Date },
    fileUrl: { type: String },
    score: { type: Number },
    feedback: { type: String },
    status: { type: String, enum: ['pending', 'submitted', 'graded'], default: 'pending' }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Assignment', assignmentSchema);

// controllers/assignmentController.js
const Assignment = require('./Assignment');

exports.createAssignment = async (req, res) => {
  try {
    const { title, description, courseId, dueDate, maxScore } = req.body;
    const newAssignment = new Assignment({
      title,
      description,
      courseId,
      dueDate,
      maxScore
    });
    await newAssignment.save();
    res.status(201).json(newAssignment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la tarea", error });
  }
};

exports.submitAssignment = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const { fileUrl } = req.body;
    const studentId = req.user._id;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const submission = {
      studentId,
      submissionDate: new Date(),
      fileUrl,
      status: 'submitted'
    };

    assignment.submissions.push(submission);
    await assignment.save();

    res.status(200).json({ message: "Tarea enviada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al enviar la tarea", error });
  }
};

exports.gradeAssignment = async (req, res) => {
  try {
    const { assignmentId, studentId } = req.params;
    const { score, feedback } = req.body;

    const assignment = await Assignment.findById(assignmentId);
    if (!assignment) {
      return res.status(404).json({ message: "Tarea no encontrada" });
    }

    const submission = assignment.submissions.find(
      sub => sub.studentId.toString() === studentId
    );

    if (!submission) {
      return res.status(404).json({ message: "Envío no encontrado" });
    }

    submission.score = score;
    submission.feedback = feedback;
    submission.status = 'graded';

    await assignment.save();
    res.status(200).json({ message: "Calificación guardada exitosamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al calificar la tarea", error });
  }
};
