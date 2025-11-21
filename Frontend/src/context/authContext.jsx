// Importo funciones y hooks de React:
// - createContext: para crear un contexto global.
// - useContext: para consumir ese contexto en cualquier componente.
// - useEffect y useState: para manejar estado y efectos secundarios.
import { createContext, useContext, useEffect, useState } from "react";

// Importo los servicios de autenticación que simulan login, registro, logout y actualización de perfil.
import { getCurrentUser, loginUser, logoutUser, registerUser, updateCurrentUserProfile } from "../services/auth";

// Creo el contexto de autenticación. Inicialmente lo dejo en null.
const AuthContext = createContext(null);

// Defino el proveedor de autenticación.
// Este componente envuelve toda la aplicación y entrega el estado de usuario y funciones relacionadas.
export function AuthProvider({ children }) {
  // Estado del usuario: al iniciar, intento obtener el usuario actual desde localStorage (getCurrentUser).
  const [user, setUser] = useState(() => getCurrentUser());

  // Variable booleana que indica si el usuario está autenticado.
  const isAuthenticated = !!user;

  // Función para registrar un nuevo usuario.
  // Llama al servicio registerUser y actualiza el estado.
  const register = async (payload) => {
    const u = await registerUser(payload);
    setUser(u);
    return u;
  };

  // Función para iniciar sesión.
  // Llama al servicio loginUser y guarda el usuario en el estado.
  const login = async (payload) => {
    const u = await loginUser(payload);
    setUser(u);
    return u;
  };

  // Función para cerrar sesión.
  // Llama al servicio logoutUser y limpia el estado.
  const logout = () => {
    logoutUser();
    setUser(null);
  };

  // Función para actualizar el perfil del usuario (nombre y teléfono).
  // Llama al servicio updateCurrentUserProfile y actualiza el estado.
  const updateProfile = ({ name, tel }) => {
    const updated = updateCurrentUserProfile({ name, tel });
    setUser(updated);
    return updated;
  };

  // Sincronización entre pestañas del navegador:
  // Si en otra pestaña se cierra sesión, este efecto escucha el evento "storage"
  // y actualiza el estado del usuario en la pestaña actual.
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === "lug_current_user") {
        setUser(getCurrentUser());
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Retorno el proveedor del contexto con los valores disponibles:
  // usuario, estado de autenticación y funciones de login, registro, logout y actualización de perfil.
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, register, login, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook personalizado para consumir el contexto de autenticación fácilmente.
export function useAuth() {
  return useContext(AuthContext);
}