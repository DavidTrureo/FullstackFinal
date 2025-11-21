// Importo Navigate y useLocation desde react-router-dom.
// - Navigate: me permite redirigir al usuario a otra ruta.
// - useLocation: me da información sobre la ruta actual.
import { Navigate, useLocation } from "react-router-dom";

// Importo el hook useAuth desde mi contexto de autenticación.
// Esto me permite saber si el usuario está logueado o no.
import { useAuth } from "../context/authContext";

// Defino el componente RequireAuth.
// Este componente envuelve a otros y decide si se muestran o si se redirige al login.
export default function RequireAuth({ children }) {
  // Obtengo el estado de autenticación desde el contexto
  const { isAuthenticated } = useAuth();

  // Obtengo la ubicación actual, para poder recordar desde dónde intentó entrar el usuario
  const location = useLocation();

  // Si el usuario NO está autenticado, lo redirijo al login.
  // Además, guardo en "state" la ruta desde la que venía, para poder volver después.
  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si el usuario SÍ está autenticado, muestro el contenido protegido (children).
  return children;
}