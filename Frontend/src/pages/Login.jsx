// Importo useState para manejar el estado del formulario.
// Importo useNavigate y useLocation de react-router-dom para redirigir al usuario después del login.
// Importo Link para crear un enlace hacia la página de registro.
// Importo useAuth para acceder a la función de login desde el contexto de autenticación.
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Defino el componente Login
export default function Login() {
  // Obtengo la función login desde el contexto de autenticación
  const { login } = useAuth();

  // Hook para navegar a otra ruta después de iniciar sesión
  const navigate = useNavigate();

  // Hook para obtener la ubicación actual (sirve para saber desde dónde vino el usuario)
  const location = useLocation();

  // Si el usuario fue redirigido desde una ruta protegida, lo devuelvo ahí después de iniciar sesión.
  // Si no, lo envío por defecto al perfil.
  const from = location.state?.from?.pathname || "/profile";

  // Estado del formulario: email y contraseña
  const [form, setForm] = useState({ email: "", password: "" });

  // Estado para mostrar errores si el login falla
  const [error, setError] = useState("");

  // Función para actualizar el formulario cada vez que el usuario escribe
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (e) => {
    e.preventDefault(); // Evito que la página se recargue
    setError("");       // Limpio errores previos
    try {
      // Intento iniciar sesión con los datos del formulario
      await login({ email: form.email.trim(), password: form.password });
      // Si funciona, redirijo al usuario a la ruta desde la que venía o al perfil
      navigate(from, { replace: true });
    } catch (err) {
      // Si falla, muestro un mensaje de error
      setError(err?.message || "No se pudo iniciar sesión.");
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              {/* Título del formulario */}
              <h3 className="card-title text-center mb-4">Iniciar Sesión</h3>

              {/* Si hay error, muestro un alert de Bootstrap */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Formulario de login */}
              <form onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Correo</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={form.email}
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary w-100">Ingresar</button>
              </form>

              {/* Enlace hacia la página de registro */}
              <p className="mt-3 text-center">
                ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}