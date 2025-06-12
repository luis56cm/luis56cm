//server/routes/assignments.js

const express = require('express');
const router = express.Router();
const assignmentController = require('../controllers/assignmentController');
const { isTeacher, isStudent } = require('../middleware/auth');
const multer = require('multer');

// Configuración de multer para el almacenamiento de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/assignments/') // Asegúrate de que este directorio exista
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // límite de 5MB
  },
  fileFilter: (req, file, cb) => {
    // Aquí puedes agregar validación de tipos de archivo permitidos
    const allowedTypes = ['application/pdf', 'application/msword', 
                         'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
                         'text/plain'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Tipo de archivo no permitido'))
    }
  }
});

// Verifica que el controlador se haya importado correctamente
console.log('Controlador de tareas cargado:', {
  createAssignment: typeof assignmentController.createAssignment,
  submitAssignment: typeof assignmentController.submitAssignment,
  gradeAssignment: typeof assignmentController.gradeAssignment
});

// Rutas para las tareas
router.post('/create', isTeacher, assignmentController.createAssignment);

router.post(
  '/:assignmentId/submit', 
  isStudent, 
  upload.single('taskFile'), 
  assignmentController.submitAssignment
);

router.post(
  '/:assignmentId/grade/:studentId', 
  isTeacher, 
  assignmentController.gradeAssignment
);

// Rutas adicionales que podrías necesitar
router.get('/course/:courseId', assignmentController.getAssignmentsByCourse);
router.get('/:assignmentId', assignmentController.getAssignmentById);
router.put('/:assignmentId', isTeacher, assignmentController.updateAssignment);
router.delete('/:assignmentId', isTeacher, assignmentController.deleteAssignment);

module.exports = router;
