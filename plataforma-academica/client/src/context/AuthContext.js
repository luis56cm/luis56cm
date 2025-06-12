// client/src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Configurar axios
axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.withCredentials = true;

export const AuthContext = createContext();

// Agregar al inicio del AuthContext.js después de las importaciones

// Interceptor para manejar errores
axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error en la petición:', error);
    
    if (error.response?.status === 401) {
      // Token inválido o expirado
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    }
    
    return Promise.reject(error);
  }
);

// Agregar una función para configurar el token
  const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem('token', token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar token al cargar la aplicación
  useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    
    if (token) {
      try {
        setAuthToken(token);
        const response = await axios.get('/api/auth/profile');
        console.log('Respuesta del perfil:', response.data);
        setUser(response.data);
      } catch (err) {
        console.error('Error al verificar autenticación:', err);
        setAuthToken(null);
        setError('Sesión expirada. Por favor, inicie sesión nuevamente.');
      }
    }
    
    setLoading(false);
  };

  checkAuth();
}, []);

  // Función de login
  const login = async (email, password) => {
  try {
    const response = await axios.post('/api/auth/login', {
      email,
      password
    });

    const { token, user } = response.data;
    
    // Usar la nueva función para configurar el token
    setAuthToken(token);
    
    // Establecer el usuario directamente desde la respuesta del login
    setUser(user);
    setError(null);
    
    return true;
  } catch (err) {
    console.error('Error completo:', err);
    setError(
      err.response?.data?.message || 
      'Error al iniciar sesión. Por favor, intente nuevamente.'
    );
    return false;
  }
};

  // Función de registro
  const register = async (userData) => {
    try {
      const response = await axios.post('/api/users/register', userData);
      
      const { token } = response.data;
      
      // Guardar token
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Obtener datos del usuario
      const userResponse = await axios.get('/api/auth/profile');
      setUser(userResponse.data);
      setError(null);
      
      return true;
    } catch (err) {
      console.error('Error detallado:', err);
      if (err.message === 'Failed to fetch' || err.code === 'ERR_NETWORK') {
        setError('Error de conexión con el servidor');
      } else {
        setError(err.response?.data?.message || 'Error al registrar usuario');
      }
      return false;
    }
  };

  // Función de logout
  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
    setError(null);
  };

  // Función para actualizar perfil
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('/api/auth/profile', userData);
      setUser(response.data);
      setError(null);
      return true;
    } catch (err) {
      console.error('Error detallado:', err);
      if (err.message === 'Failed to fetch' || err.code === 'ERR_NETWORK') {
        setError('Error de conexión con el servidor');
      } else {
        setError(err.response?.data?.message || 'Error al actualizar perfil');
      }
      return false;
    }
  };

  // Función para limpiar errores
  const clearError = () => setError(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile,
        clearError
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
