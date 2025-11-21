// Importo los estilos principales de Bootstrap para tener un diseño base moderno y responsivo
import 'bootstrap/dist/css/bootstrap.min.css';

// Importo también el bundle de JavaScript de Bootstrap, que incluye componentes interactivos como modales o dropdowns
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// Importo la librería animate.css para poder usar animaciones predefinidas en mis componentes
import 'animate.css';

// Importo mis propios estilos personalizados desde la carpeta styles
import './styles/Themes.css';

// Importo los íconos de Bootstrap, que me permiten usar una gran variedad de íconos listos
import 'bootstrap-icons/font/bootstrap-icons.css';


// Importo React, la librería principal para construir la interfaz
import React from 'react'

// Importo ReactDOM, que me permite renderizar mi aplicación dentro del navegador
import ReactDOM from 'react-dom/client'

// Importo el componente raíz de mi aplicación, App.jsx
import App from './App.jsx'

// Aquí es donde realmente monto mi aplicación en el navegador.
// ReactDOM.createRoot busca el elemento con id="root" en index.html
// y dentro de ese contenedor renderiza mi aplicación.
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode es una herramienta de desarrollo que me ayuda a detectar problemas potenciales
  <React.StrictMode>
    {/* App es el componente principal que contiene toda mi aplicación */}
    <App />
  </React.StrictMode>,
)