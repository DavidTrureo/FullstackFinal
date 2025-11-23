import { useAuthContext } from "../context/authContext";

// Este hook es solo un wrapper para consumir el contexto
export function useAuth() {
    return useAuthContext();
}