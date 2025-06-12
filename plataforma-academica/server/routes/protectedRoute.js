// server/routes/protectedRoute.js
const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/auth');

// Ruta protegida que requiere autenticación
router.get('/user-profile', verifyToken, (req, res) => {
  // Si llegamos aquí, significa que el usuario está autenticado
  res.json({ 
    message: 'Acceso permitido', 
    user: {
      id: req.user.id,
      role: req.user.role,
      // No incluir información sensible
      // Agregar solo los campos necesarios
    } 
  });
});

module.exports = router;