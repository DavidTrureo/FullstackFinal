// Defino el componente Footer
export default function Footer() {
  return (
    // Uso un <footer> con clases de Bootstrap para darle estilo:
    // - bg-dark: fondo oscuro
    // - text-white: texto blanco
    // - text-center: contenido centrado
    // - py-4: padding vertical
    // - mt-5: margen superior
    <footer className="bg-dark text-white text-center py-4 mt-5">
      <div className="container">
        
        {/* Texto de derechos reservados */}
        <p className="mb-0">
          © 2025 Level-Up Gamer. Todos los derechos reservados.
        </p>

        {/* Enlaces a redes sociales con íconos de Bootstrap Icons */}
        <div className="social-links mt-2">
          <a href="#" className="text-white mx-2" aria-label="Enlace a Facebook">
            <i className="bi bi-facebook"></i>
          </a>
          <a href="#" className="text-white mx-2" aria-label="Enlace a Twitter">
            <i className="bi bi-twitter"></i>
          </a>
          <a href="#" className="text-white mx-2" aria-label="Enlace a Instagram">
            <i className="bi bi-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
}