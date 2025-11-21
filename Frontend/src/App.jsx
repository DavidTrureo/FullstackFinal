// Importo los estilos generales de la aplicación
import "./App.css";

// Importo herramientas de React Router para manejar la navegación
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

// Importo hooks de React para manejar estado y efectos
import { useEffect, useState } from "react";

// Importo el contexto de autenticación y el componente que protege rutas privadas
import { AuthProvider, useAuth } from "./context/authContext";
import RequireAuth from "./components/RequireAuth";

// Importo los componentes principales de la interfaz
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contacto from "./pages/Contacto";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Checkout from "./pages/Checkout";
import OrderSummary from "./pages/OrderSummary";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

function AppRoutes() {
  // 🛒 Estado del carrito con persistencia en localStorage
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cada vez que cambia el carrito, lo guardo en localStorage
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // ➕ Agregar producto: si ya existe, incremento cantidad; si no, lo agrego nuevo
  const addItem = (item) => {
    setCartItems((prev) => {
      const id = item.sku || item.id;
      const idx = prev.findIndex((p) => p.id === id);
      if (idx !== -1) {
        return prev.map((p, i) =>
          i === idx ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
      }
      return [...prev, { ...item, id, qty: 1 }];
    });
  };

  // ➕ Incrementar cantidad de un producto
  const incItem = (item) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
    );
  };

  // ➖ Decrementar cantidad: si llega a 0, elimino la línea
  const decItem = (item) => {
    setCartItems((prev) =>
      prev.flatMap((p) => {
        if (p.id !== item.id) return [p];
        const nextQty = (p.qty || 1) - 1;
        return nextQty > 0 ? [{ ...p, qty: nextQty }] : [];
      })
    );
  };

  // 🗑️ Eliminar un producto completamente del carrito
  const removeLine = (item) => {
    setCartItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  // 🧹 Vaciar todo el carrito
  const clearCart = () => setCartItems([]);

  // 💳 Función para navegar al checkout
  const navigate = useNavigate();
  const checkout = () => navigate("/checkout");

  // 🔐 Estado de autenticación para mostrar opciones en el Navbar
  const { isAuthenticated, logout } = useAuth();

  // Contador de productos en el carrito (suma de cantidades, no de líneas)
  const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);

  return (
    <>
      {/* Navbar recibe el contador del carrito y estado de autenticación */}
      <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} onLogout={logout} />

      {/* Defino las rutas principales de la aplicación */}
      <div style={{ paddingTop: "4.5rem" }}>
        <Routes>
          <Route path="/" element={<Home onAdd={addItem} />} />
          <Route path="/productos" element={<Products onAdd={addItem} />} />

          <Route path="/contacto" element={<Contacto />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Ruta protegida: solo accesible si el usuario está autenticado */}
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          />

          {/* Checkout recibe el carrito y limpia al finalizar */}
          <Route
            path="/checkout"
            element={<Checkout cartItems={cartItems} onFinalize={() => clearCart()} />}
          />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </div>

      {/* Footer fijo en todas las páginas */}
      <Footer />

      {/* Modal del carrito con controles de cantidad */}
      <CartModal
        cartItems={cartItems}
        onClearCart={clearCart}
        onCheckout={checkout}
        onIncItem={incItem}
        onDecItem={decItem}
        onRemoveLine={removeLine}
      />
    </>
  );
}

// Componente principal: envuelve todo en BrowserRouter y AuthProvider
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}