import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartContext"; // Importamos el proveedor
import { useCart } from "./hooks/useCart"; // Importamos el hook desde su nuevo archivo

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

// Rutas modularizadas
import AppRoutes from "./routes/AppRoutes";

import { useState, useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  console.log("[App] render");

  // useNavigate must be used inside a Router; create an inner component
  // that is rendered after BrowserRouter so hooks work correctly.
  function AppInner() {
    const { isAuthenticated, logout } = useAuth();
    // Obtenemos los datos del carrito desde el nuevo contexto
    const { cartItems, clearCart, incItem, decItem, removeLine } = useCart();
    const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);
    const navigate = useNavigate();
    const checkout = () => navigate("/checkout");

    const [isCartOpen, setIsCartOpen] = useState(false);
    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    // Nota: el listener global que prevenía submits accidentales fue removido.
    // Se confía ahora en que los botones en JSX declaren `type` correctamente.

    return (
      <>
        <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} onLogout={logout} onOpenCart={openCart} />

        <div style={{ paddingTop: "4.5rem" }}>
          <AppRoutes />
        </div>

        <Footer />

        <CartModal
          cartItems={cartItems}
          onClearCart={clearCart}
          onCheckout={checkout}
          onIncItem={incItem}
          onDecItem={decItem}
          onRemoveLine={removeLine}
          isOpen={isCartOpen}
          onClose={closeCart}
        />
      </>
    );
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <AppInner />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}