// Importo NavLink desde react-router-dom para crear un enlace interno
// que lleva directamente a la página de productos.
import { NavLink } from 'react-router-dom';

// Defino el componente Hero
export default function Hero() {
  return (
    // Sección principal de bienvenida con estilos de Bootstrap:
    // - bg-dark: fondo oscuro
    // - text-white: texto blanco
    // - text-center: contenido centrado
    // - py-5: padding vertical
    // - d-flex + align-items-center + justify-content-center: centra el contenido
    <section className="hero-section bg-dark text-white text-center py-5 d-flex align-items-center justify-content-center pt-5">
      <div className="container mt-5">
        
        {/* Título principal con animación de entrada */}
        <h1 className="display-4 mb-3 animate__animated animate__fadeInDown">
          Bienvenido a Level-Up Gamer
        </h1>

        

        {/* Subtítulo con animación de subida */}
        <p className="lead mb-4 animate__animated animate__fadeInUp">
          Tu tienda gamer de confianza: notebooks, PCs, accesorios y más.
        </p>

        {/* Botón que lleva a la sección de productos */}
        <NavLink to="/productos" className="btn btn-primary btn-lg mt-3">
          Explorar Productos
        </NavLink>
      </div>
    </section>
  );
}