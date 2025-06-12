// middleware/upload.js
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig'); // Importar configuración de Cloudinary

// Configuración del almacenamiento en Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'assignments', // Cambia el nombre si quieres organizar en otras carpetas
    resource_type: 'auto', // Auto detecta el tipo de archivo
  },
});

// Configuración de multer
const upload = multer({ storage });

module.exports = upload;
