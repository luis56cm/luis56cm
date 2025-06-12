// models/Submission.js
const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assignment',
    required: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  filePath: {
    type: String,
    required: false // Puede ser opcional si permites envíos sin archivo
  },
  comment: {
    type: String,
    trim: true,
    maxLength: 1000 // Límite razonable para comentarios
  },
  grade: {
    type: Number,
    min: 0,
    max: 100,
    default: null
  },
  feedback: {
    type: String,
    trim: true,
    maxLength: 2000 // Límite para el feedback del profesor
  },
  status: {
    type: String,
    enum: ['pending', 'submitted', 'late', 'graded'],
    default: 'pending'
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  gradedAt: {
    type: Date
  },
  gradedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isLate: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true, // Añade createdAt y updatedAt
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});

// Índices para mejorar el rendimiento de las consultas
submissionSchema.index({ assignmentId: 1, studentId: 1 }, { unique: true }); // Un estudiante solo puede tener una entrega por tarea
submissionSchema.index({ status: 1 }); // Para búsquedas por estado
submissionSchema.index({ gradedAt: 1 }); // Para búsquedas por fecha de calificación

// Virtual para calcular los días de retraso
submissionSchema.virtual('daysLate').get(function() {
  if (!this.submittedAt || !this._assignment) return 0;
  const dueDate = new Date(this._assignment.dueDate);
  const submittedDate = new Date(this.submittedAt);
  if (submittedDate <= dueDate) return 0;
  
  const diffTime = Math.abs(submittedDate - dueDate);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Middleware pre-save para verificar si la entrega es tardía
submissionSchema.pre('save', async function(next) {
  try {
    if (this.isNew || this.isModified('submittedAt')) {
      const assignment = await mongoose.model('Assignment').findById(this.assignmentId);
      if (assignment && this.submittedAt > assignment.dueDate) {
        this.isLate = true;
        this.status = 'late';
      }
    }
    next();
  } catch (error) {
    next(error);
  }
});

// Método estático para encontrar todas las entregas de un estudiante
submissionSchema.statics.findByStudent = function(studentId) {
  return this.find({ studentId })
    .populate('assignmentId')
    .sort({ submittedAt: -1 });
};

// Método estático para encontrar todas las entregas de una tarea
submissionSchema.statics.findByAssignment = function(assignmentId) {
  return this.find({ assignmentId })
    .populate('studentId', 'name email')
    .sort({ submittedAt: -1 });
};

// Método para obtener estadísticas de las entregas
submissionSchema.statics.getSubmissionStats = async function(assignmentId) {
  return this.aggregate([
    { $match: { assignmentId: mongoose.Types.ObjectId(assignmentId) } },
    { 
      $group: {
        _id: '$status',
        count: { $sum: 1 },
        avgGrade: { $avg: '$grade' }
      }
    }
  ]);
};

const Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;