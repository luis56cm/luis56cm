// server/server.js
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const courseController = require('./controllers/courseController');
const assignmentRoutes = require('./routes/assignments');
const notificationRoutes = require('./routes/notifications');
const authRoutes = require('./routes/auth');
const protectedRoute = require('./routes/protectedRoute');

dotenv.config();

const app = express();

// Configuración mejorada de CORS
app.use(cors({
  origin: 'http://localhost:3001', // URL de tu frontend
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/plataforma-academica', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error conectando a MongoDB:', err));

// Middleware para logging de requests
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    next();
});

// Rutas de la API para los cursos
app.post('/api/courses', courseController.createCourse);
app.get('/api/courses', courseController.getAllCourses);
app.get('/api/courses/:id', courseController.getCourseById);
app.put('/api/courses/:id', courseController.updateCourse);
app.delete('/api/courses/:id', courseController.deleteCourse);
app.post('/api/courses/:id/enroll', courseController.enrollInCourse);
app.post('/api/courses/:id/unenroll', courseController.unenrollFromCourse);

// Rutas específicas
app.use('/api/assignments', assignmentRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/auth', authRoutes);
app.use('/api', protectedRoute);

// Manejo de errores global
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Algo salió mal!',
        error: process.env.NODE_ENV === 'development' ? err.message : 'Error interno del servidor'
    });
});

// Ruta de prueba básica
app.get('/', (req, res) => {
    res.json({ message: 'Bienvenido a la API de la Plataforma Académica' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});