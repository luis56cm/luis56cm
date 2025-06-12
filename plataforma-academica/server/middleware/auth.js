// server/middleware/auth.js
require('dotenv').config();
const jwt = require('jsonwebtoken');

// Función auxiliar para obtener el token de manera consistente
const getTokenFromHeader = (req) => {
  const authHeader = req.header('Authorization');
  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.replace('Bearer ', '');
  }
  return req.header('x-auth-token'); // Soporte para x-auth-token como fallback
};

// Middleware para verificar si el usuario es un "Teacher"
const isTeacher = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'teacher') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

// Middleware para verificar si el usuario es un "Student"
const isStudent = (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ message: 'Acceso no autorizado' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'student') {
      return res.status(403).json({ message: 'No tienes permiso para realizar esta acción' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token no válido' });
  }
};

// Middleware para verificar el token
const verifyToken = (req, res, next) => {
  console.log('Headers recibidos:', req.headers);
  const token = getTokenFromHeader(req);
  
  console.log('Token extraído:', token ? 'Presente' : 'No presente');
  
  if (!token) {
    return res.status(401).json({ message: 'No se proporcionó un token.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Token decodificado:', decoded);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Error al verificar token:', error);
    return res.status(401).json({ message: 'Token inválido.' });
  }
};

// Exportar todos los middlewares correctamente
module.exports = {
  isTeacher,
  isStudent,
  verifyToken
};
