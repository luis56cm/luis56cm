// server/routes/auth.js
const express = require('express');
const { check } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');

// Rutas públicas con validaciones
router.post(
  '/register',
  [
    check('username', 'El nombre de usuario es obligatorio').notEmpty(),
    check('email', 'Por favor incluya un email válido').isEmail(),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('profile.firstName', 'El nombre es obligatorio').notEmpty(),
    check('profile.lastName', 'El apellido es obligatorio').notEmpty()
  ],
  authController.register
);

router.post(
  '/login',
  [
    check('email', 'Por favor incluya un email válido').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
  ],
  authController.login
);

// Rutas protegidas
router.get('/profile', verifyToken, authController.getProfile);

module.exports = router;
