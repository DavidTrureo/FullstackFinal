// Importo NavLink y Link desde react-router-dom.
// - Link: para enlaces simples sin recargar la página.
// - NavLink: igual que Link, pero además me permite aplicar estilos activos cuando la ruta coincide.
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // ← Importa tu contexto de autenticación

export default function Navbar({ cartCount = 0 }) {
  // Obtengo los datos del contexto
  const { user, isAuthenticated, logout } = useAuth();

  return (
    // Uso clases de Bootstrap para crear una barra de navegación fija, oscura y expandible.
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div className="container-fluid">

        {/* Logo o marca de la aplicación, que redirige al inicio */}
        <Link className="navbar-brand" to="/">Level-Up Gamer</Link>

        {/* Botón hamburguesa para colapsar el menú en pantallas pequeñas */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
          aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Contenedor del menú colapsable */}
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* Enlace a Inicio */}
            <li className="nav-item">
              <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Inicio</NavLink>
            </li>
            {/* Enlace a Productos */}
            <li className="nav-item">
              <NavLink to="/productos" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Productos</NavLink>
            </li>
            {/* Enlace a Contacto */}
            <li className="nav-item">
              <NavLink to="/contacto" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contacto</NavLink>
            </li>
          </ul>

          {/* Sección derecha: botones de login/registro o cuenta/cerrar sesión, más el carrito */}
          <div className="d-flex align-items-center gap-2">
            {/* Si el usuario NO está autenticado, muestro botones de Login y Registro */}
            {!isAuthenticated ? (
              <div id="auth-buttons" className="d-flex gap-2">
                <NavLink to="/login" className="btn btn-outline-light">Login</NavLink>
                <NavLink to="/register" className="btn btn-primary">Registrarse</NavLink>
              </div>
            ) : (
              // Si el usuario SÍ está autenticado, muestro su nombre y el botón de Cerrar sesión
              <>
                <NavLink to="/profile" className="btn btn-primary" id="account-button">
                  {user?.name || "Cuenta"}
                </NavLink>
                <button className="btn btn-outline-light" type="button" onClick={logout}>
                  Cerrar sesión
                </button>
              </>
            )}

            {/* Botón del carrito con contador dinámico */}
            <button className="btn btn-outline-light position-relative" id="btnCart" aria-label="Ver carrito"
              data-bs-toggle="modal" data-bs-target="#cartModal" type="button">
              🛒 Carrito
              {/* Badge que muestra la cantidad total de productos en el carrito */}
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary" id="cart-count">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}