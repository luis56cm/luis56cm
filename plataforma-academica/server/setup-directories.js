const fs = require('fs');
const path = require('path');

// Función para crear directorio si no existe
function createDirectoryIfNotExists(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Directorio creado: ${dirPath}`);
    } else {
      console.log(`El directorio ya existe: ${dirPath}`);
    }
  } catch (error) {
    console.error(`Error al crear el directorio ${dirPath}:`, error);
    throw error;
  }
}

// Crear estructura de directorios necesaria
function setupDirectories() {
  const directories = [
    'uploads',
    'uploads/assignments'
  ];

  directories.forEach(dir => {
    createDirectoryIfNotExists(path.join(process.cwd(), dir));
  });

  // Crear archivo .gitkeep para mantener el directorio en git
  directories.forEach(dir => {
    const gitkeepPath = path.join(process.cwd(), dir, '.gitkeep');
    if (!fs.existsSync(gitkeepPath)) {
      fs.writeFileSync(gitkeepPath, '');
      console.log(`Archivo .gitkeep creado en: ${dir}`);
    }
  });
}

// Ejecutar la configuración
setupDirectories();