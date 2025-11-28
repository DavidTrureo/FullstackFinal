// Importo el hook useState de React para manejar el estado del formulario
import { useState } from "react";

// Defino el componente Contacto
export default function Contacto() {
  // Estado inicial del formulario con tres campos: nombre, email y mensaje
  const [form, setForm] = useState({ "contact-nombre": "", "contact-email": "", "contact-comentarios": "" });

  // Función para manejar cambios en los inputs
  // Extrae el id y el valor del input que cambió y actualiza el estado
  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.id]: e.target.value }));
  };

  // Función para manejar el envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    // Validación básica y simulación de envío
    alert("Mensaje enviado ✅");
  };

  return (
    <>
      {/* Encabezado de la página con título y subtítulo */}
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Contáctanos</h1>
          <p className="lead">Envíanos un mensaje y te responderemos a la brevedad.</p>
        </div>
      </header>

      {/* Contenido principal con el formulario de contacto */}
      <main className="container py-5">
        <section>
          <h2 className="text-center mb-4">Envíanos un Mensaje</h2>
          <form className="row g-3" onSubmit={onSubmit}>
            {/* Campo de nombre */}
            <div className="col-md-6">
              <label htmlFor="contact-nombre" className="form-label">Nombre</label>
              <input
                id="contact-nombre" // El id debe coincidir con la clave en el estado
                className="form-control"
                value={form["contact-nombre"]}
                onChange={onChange}
                required
              />
            </div>

            {/* Campo de correo electrónico */}
            <div className="col-md-6">
              <label htmlFor="contact-email" className="form-label">Correo Electrónico</label>
              <input
                id="contact-email"
                type="email"
                className="form-control"
                value={form["contact-email"]}
                onChange={onChange}
                required
              />
            </div>

            {/* Campo de mensaje */}
            <div className="col-12">
              <label htmlFor="contact-comentarios" className="form-label">Mensaje</label>
              <textarea
                id="contact-comentarios"
                className="form-control"
                rows="5"
                value={form["contact-comentarios"]}
                onChange={onChange}
                required
              />
            </div>

            {/* Botón de envío */}
            <div className="col-12">
              <button className="btn btn-primary" type="submit">Enviar Mensaje</button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}