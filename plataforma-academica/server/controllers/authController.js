// server/controllers/authController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const { validationResult } = require('express-validator'); // Usar si usas express-validator
const User = require('../models/User');

const jwtSign = promisify(jwt.sign); // Promisificar jwt.sign

// Registro de usuarios
const register = async (req, res) => {
  try {
    const { username, email, password, profile, role } = req.body;

    // Validar entradas
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    if (!username || !email || !password || !profile.firstName || !profile.lastName) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe
    let user = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (user) {
      return res.status(400).json({ message: 'El usuario o email ya existe' });
    }

    // Crear nuevo usuario
    user = new User({
      username,
      email,
      password, // El hash se realiza en el middleware pre-save
      profile,
      role: role || 'student',
    });

    await user.save();

    // Crear y devolver el token
    const payload = { user: { id: user.id, role: user.role } };
    const token = await jwtSign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.status(201).json({ token });
  } catch (error) {
    console.error('Error en registro:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Login de usuarios
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    console.log('Datos recibidos:', { email, password });

    if (!email || !password) {
      console.log('Faltan campos obligatorios');
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log('Usuario encontrado:', user ? 'Sí' : 'No');
    
    if (!user) {
      return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Contraseña válida:', isMatch);

    if (!isMatch) {
      return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    // Modificar el payload para incluir toda la información necesaria
    const payload = {
      id: user._id.toString(), // Asegurarnos que sea string
      role: user.role,
      username: user.username
    };
  
    console.log('Payload del token:', payload);

    const token = await jwtSign(payload, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ 
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        email: user.email,
        profile: user.profile
      }
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

// Obtener perfil del usuario
const getProfile = async (req, res) => {
  try {
    console.log('req.user en getProfile:', req.user);
    
    if (!req.user || !req.user.id) {
      console.log('Buscando usuario con ID alternativo:', req.user?._id);
      // Intentar con _id si id no está disponible
      const userId = req.user?.id || req.user?._id;
      
      if (!userId) {
        return res.status(401).json({ message: 'No autorizado - Token inválido' });
      }
    }

    const user = await User.findById(req.user.id || req.user._id).select('-password');
    console.log('Usuario encontrado en getProfile:', user ? 'Sí' : 'No');
    
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error al obtener perfil:', error);
    res.status(500).json({ message: 'Error en el servidor', error: error.message });
  }
};

module.exports = {
  register,
  login,
  getProfile,
};
