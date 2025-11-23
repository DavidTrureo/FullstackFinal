import { createContext, useContext, useState, useEffect } from "react";
import {
  loginUser as apiLogin,
  registerUser as apiRegister,
  updateCurrentUserProfile as apiUpdateProfile,
  getCurrentUser as apiGetCurrentUser,
} from "../services/auth";
import { apiFetch } from "../services/api";
import { setAuthToken } from "../services/api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => apiGetCurrentUser());
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Configurar token en las peticiones cada vez que cambie
  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const login = async ({ email, password } = {}) => {
    if (!email || !password) throw new Error("Email y contraseña son requeridos.");
    // services/auth.loginUser expects a single object { email, password }
    const userData = await apiLogin({ email, password });
    if (userData) {
      setUser(userData);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const register = async ({ name, email, tel, password } = {}) => {
    if (!email || !password || !name) throw new Error("Nombre, email y contraseña son requeridos.");
    // DEBUG: log del objeto recibido por el contexto antes de llamar al servicio
    try {
      console.log(
        "[DEBUG] AuthProvider.register received:",
        JSON.stringify({ name, email, tel, password: password ? "<redacted>" : undefined })
      );
    } catch (e) {
      console.log("[DEBUG] AuthProvider.register received (could not stringify)", { name, email, tel });
    }

    // Primero intento registrar en el backend (si está disponible).
    // Endpoint esperado: POST `${BASE_URL}/auth/register` o similar.
    try {
      const res = await apiFetch("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, tel, password }),
      });

      if (res.ok) {
        // Asumimos que el backend devuelve { user, token } o al menos user
        const payload = res.data || {};
        const createdUser = payload.user || payload;
        setUser(createdUser || null);
        if (payload.token) {
          setToken(payload.token);
          localStorage.setItem("token", payload.token);
        } else {
          setToken(null);
          localStorage.removeItem("token");
        }
        return createdUser;
      }

      // Si el backend respondió con error (por ejemplo email tomado), lo propagamos
      const err = new Error(res.error?.message || res.error || "Error en registro remoto.");
      err.code = res.error?.code || null;
      throw err;
    } catch (e) {
      // Si falla la llamada remota (no disponible, CORS, etc.), hago fallback al registro local
      console.warn("[AuthProvider] registro remoto falló, usando registro local:", e?.message);
      try {
        const newUser = await apiRegister({ name, email, tel, password });
        return newUser;
      } catch (err) {
        console.error("[ERROR] AuthProvider.register -> apiRegister threw:", err);
        throw err;
      }
    }
    if (newUser) {
      setUser(newUser);
      setToken(null);
      localStorage.removeItem("token");
    }
  };

  const updateProfile = async (data) => {
    const updatedUser = await apiUpdateProfile(data);
    setUser(updatedUser);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    setAuthToken(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated, login, register, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Exporto el contexto para que useAuth pueda consumirlo
export function useAuthContext() {
  return useContext(AuthContext);
}

// Alias con el nombre esperado por otros componentes: `useAuth`
export function useAuth() {
  return useContext(AuthContext);
}