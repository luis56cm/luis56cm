// routes/notifications.js
const express = require('express');
const router = express.Router();

// Importa el controlador de notificaciones (lo crearemos más adelante)
const { getNotifications, createNotification } = require('../controllers/notificationController');

// Ruta para obtener todas las notificaciones
router.get('/', getNotifications);

// Ruta para crear una nueva notificación
router.post('/', createNotification);

// Exporta las rutas
module.exports = router;
