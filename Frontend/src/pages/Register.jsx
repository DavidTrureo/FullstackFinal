// Importo useState para manejar el estado del formulario.
// Importo useNavigate para redirigir al usuario después de registrarse.
// Importo Link para crear un enlace hacia la página de login.
// Importo useAuth para acceder a la función register desde el contexto de autenticación.
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

// Defino el componente Register
export default function Register() {
  // Obtengo la función register desde el contexto de autenticación
  const { register } = useAuth();

  // Hook para navegar a otra ruta después de registrarse
  const navigate = useNavigate();

  // Estado del formulario: nombre, correo, teléfono, contraseña y confirmación
  const [form, setForm] = useState({ name: "", email: "", tel: "", password: "", confirm: "" });

  // Estado para mostrar errores si el registro falla
  const [error, setError] = useState("");

  // Función para actualizar el formulario cada vez que el usuario escribe
  const onChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (e) => {
    e.preventDefault(); // Evito que la página se recargue
    setError("");       // Limpio errores previos

    // Verifico que las contraseñas coincidan
    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    try {
      // Intento registrar al usuario con los datos del formulario
      await register({
        name: form.name.trim(),
        email: form.email.trim(),
        tel: form.tel.trim(),
        password: form.password,
      });

      // Si funciona, redirijo al perfil
      navigate("/profile", { replace: true });
    } catch (err) {
      // Si falla, muestro un mensaje de error
      setError(err?.message || "Error al registrar.");
    }
  };

  return (
    <main className="container py-5 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-body">
              {/* Título del formulario */}
              <h3 className="card-title text-center mb-4">Crear Cuenta</h3>

              {/* Si hay error, muestro un alert de Bootstrap */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* Formulario de registro */}
              <form onSubmit={onSubmit}>
                {/* Campo de nombre */}
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    className="form-control"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Campo de correo */}
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

                {/* Campo de teléfono */}
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    className="form-control"
                    name="tel"
                    value={form.tel}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Campo de contraseña */}
                <div className="mb-3">
                  <label className="form-label">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    value={form.password}
                    onChange={onChange}
                    minLength={6}
                    required
                  />
                </div>

                {/* Campo de confirmación de contraseña */}
                <div className="mb-3">
                  <label className="form-label">Confirmar contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    name="confirm"
                    value={form.confirm}
                    onChange={onChange}
                    required
                  />
                </div>

                {/* Botón de envío */}
                <button type="submit" className="btn btn-primary w-100">Registrarse</button>
              </form>

              {/* Enlace hacia la página de login */}
              <p className="mt-3 text-center">
                ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}