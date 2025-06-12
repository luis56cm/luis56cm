import React, { useState } from 'react';
import { Card, CardContent, TextField, Button, Typography } from '../ui/card';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, email, password })
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
      } else {
        // Redirigir al usuario a la página de inicio de sesión
      }
    } catch (err) {
      setError('Error al registrar el usuario');
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardContent className="space-y-4">
        <Typography variant="h4" className="text-center">
          Registro
        </Typography>
        <TextField
          label="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextField
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button onClick={handleRegister} variant="contained">
          Registrarse
        </Button>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;