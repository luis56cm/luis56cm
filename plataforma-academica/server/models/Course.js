// server/models/Course.js
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia al modelo de usuario (profesor)
    required: true
  },
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Referencia al modelo de usuario (estudiantes)
  }],
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  schedule: {
    type: String,  // Aquí podrías almacenar el horario del curso
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Course', courseSchema);
