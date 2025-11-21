# 🎮 Level-Up Gamer

**Level-Up Gamer** es una aplicación web desarrollada con **React** que simula una tienda gamer.  
Incluye navegación, autenticación de usuarios, gestión de carrito de compras y flujo completo de checkout.

---

## 🚀 Características principales

- 🛒 **Carrito de compras** con persistencia en `localStorage`  
- 🔐 **Autenticación de usuarios** (registro, login, perfil y actualización de datos)  
- 📦 **Checkout y resumen de pedido** con formulario de envío y pago  
- 🎨 **Interfaz moderna** con Bootstrap, Bootstrap Icons y Animate.css  
- ⚡ **Routing dinámico** con React Router  
- 🧩 **Componentes reutilizables** y estructura modular  

---

## 🛠️ Tecnologías utilizadas

- [React](https://react.dev/)  
- [React Router](https://reactrouter.com/)  
- [Bootstrap](https://getbootstrap.com/) + [Bootstrap Icons](https://icons.getbootstrap.com/)  
- [Animate.css](https://animate.style/)  
- Context API para autenticación  
- `localStorage` para persistencia de datos  

---

## 📂 Estructura del proyecto

src/
 ├── components/        # Navbar, Footer, Hero, ProductCard, CartModal, RequireAut
 
 ├── pages/             # Home, Products, Contacto, Login, Register, Profile, Checkout, OrderSummar
 
 ├── context/           # AuthContext (manejo de autenticación
 
 ├── services/          # auth.js (servicios de login/registro
 
 ├── styles/            # CSS personalizad
 
 ├── App.jsx            # Rutas principales y lógica del carrit
 
 └── main.jsx           # Punto de entrada de la aplicació


## ▶️ Instalación y ejecución

1. Clona el repositorio:  
   ```bash
   git clone https://github.com/yovngburgos/LevelUpGamer.git
   cd level-up-gamer

   a. Instala dependencias:
     npm install
   b. Ejecuta en modo desarrollo:
     npm run dev
   c.Abre en tu navegador:
     http://localhost:5173


👤 Autenticación

•  Registro de nuevos usuarios con nombre, correo, teléfono y contraseña.
•  Login con validación de credenciales.
•  Perfil editable (nombre y teléfono).
•  Persistencia de sesión en localStorage.

📜 Scripts disponibles

•  npm run dev → inicia servidor de desarrollo con Vite

•  npm run build → genera la versión optimizada para producción

•  npm run preview → sirve la app compilada para pruebas

•  npm run lint → revisa el código con ESLint

•  npm run test → corre pruebas con Vitest en modo interactivo

•  npm run test:run → corre las pruebas una sola vez

•  npm run coverage → genera reporte de cobertura de pruebas

