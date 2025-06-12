// client/src/context/userContext.js
import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de usuario
const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);  // Establecer el estado del usuario cuando inicie sesión
  };

  const logout = () => {
    setUser(null);  // Eliminar el estado del usuario cuando cierre sesión
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para consumir el contexto
export const useUser = () => {
  return useContext(UserContext);
};
