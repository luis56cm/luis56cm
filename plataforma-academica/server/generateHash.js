const bcrypt = require('bcrypt');
const saltRounds = 10; // Ajusta el número de rondas de sal si lo necesitas

const password = 'hashedpassword'; // Reemplaza esto con la contraseña que quieres hashear

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
  } else {
    console.log('Hash generado:', hash); // Aquí se imprimirá el hash generado
  }
});
