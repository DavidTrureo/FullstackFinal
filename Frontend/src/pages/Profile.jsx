// Importo useState para manejar estados locales.
// Importo useAuth para acceder al usuario y a la función updateProfile desde el contexto de autenticación.
import { useState } from "react";
import { useAuth } from "../context/authContext";

// Defino el componente Profile
export default function Profile() {
  // Obtengo el usuario actual y la función para actualizar su perfil desde el contexto
  const { user, updateProfile } = useAuth();

  // Estado para saber si estoy en modo edición o solo visualización
  const [editing, setEditing] = useState(false);

  // Estado del formulario, inicializado con los datos del usuario (nombre y teléfono)
  const [form, setForm] = useState({ name: user?.name ?? "", tel: user?.tel ?? "" });

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (e) => {
    e.preventDefault(); // Evito recargar la página
    // Actualizo el perfil con los datos del formulario (limpiando espacios con trim)
    updateProfile({ name: form.name.trim(), tel: form.tel.trim() });
    // Salgo del modo edición y vuelvo a la vista normal
    setEditing(false);
  };

  return (
    <>
      {/* Encabezado de la página con título y subtítulo */}
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Mi Cuenta</h1>
          <p className="lead">Gestiona la información de tu perfil.</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container py-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title text-center mb-4">Información del Usuario</h4>

            {/* Si NO estoy editando, muestro los datos actuales del usuario */}
            {!editing ? (
              <>
                <p><strong>Nombre:</strong> <span>{user?.name}</span></p>
                <p><strong>Correo:</strong> <span>{user?.email}</span></p>
                <p><strong>Teléfono:</strong> <span>{user?.tel}</span></p>
                <div className="d-flex justify-content-center mt-4 gap-2">
                  {/* Botón para pasar al modo edición */}
                  <button className="btn btn-warning" onClick={() => setEditing(true)}>Editar perfil</button>
                </div>
              </>
            ) : (
              // Si estoy en modo edición, muestro el formulario para actualizar nombre y teléfono
              <form className="mt-3" onSubmit={onSubmit}>
                <div className="mb-3">
                  <label className="form-label">Nombre completo</label>
                  <input
                    className="form-control"
                    value={form.name}
                    onChange={(e)=>setForm({...form, name: e.target.value})}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Teléfono</label>
                  <input
                    className="form-control"
                    value={form.tel}
                    onChange={(e)=>setForm({...form, tel: e.target.value})}
                    required
                  />
                </div>
                <div className="d-flex justify-content-end gap-2">
                  {/* Botón para cancelar y volver a la vista normal */}
                  <button type="button" className="btn btn-secondary" onClick={()=>setEditing(false)}>Cancelar</button>
                  {/* Botón para guardar los cambios */}
                  <button type="submit" className="btn btn-success">Guardar cambios</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </main>
    </>
  );
}