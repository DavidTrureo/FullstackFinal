import "./App.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/authContext";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CartModal from "./components/CartModal";

// Rutas modularizadas
import AppRoutes from "./routes/AppRoutes";

// Estado global del carrito
import { useState, useEffect } from "react";
import { useAuth } from "./context/authContext";
import { useNavigate } from "react-router-dom";

export default function App() {
  console.log("[App] render");
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

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

  const incItem = (item) => {
    setCartItems((prev) =>
      prev.map((p) =>
        p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
      )
    );
  };

  const decItem = (item) => {
    setCartItems((prev) =>
      prev.flatMap((p) => {
        if (p.id !== item.id) return [p];
        const nextQty = (p.qty || 1) - 1;
        return nextQty > 0 ? [{ ...p, qty: nextQty }] : [];
      })
    );
  };

  const removeLine = (item) => {
    setCartItems((prev) => prev.filter((p) => p.id !== item.id));
  };

  const clearCart = () => setCartItems([]);

  // useNavigate must be used inside a Router; create an inner component
  // that is rendered after BrowserRouter so hooks work correctly.
  function AppInner() {
    const { isAuthenticated, logout } = useAuth();
    const cartCount = cartItems.reduce((acc, it) => acc + (it.qty || 1), 0);
    const navigate = useNavigate();
    const checkout = () => navigate("/checkout");

    return (
      <>
        <Navbar cartCount={cartCount} isAuthenticated={isAuthenticated} onLogout={logout} />

        <div style={{ paddingTop: "4.5rem" }}>
          <AppRoutes
            cartItems={cartItems}
            onAdd={addItem}
            onFinalize={clearCart}
          />
        </div>

        <Footer />

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

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppInner />
      </AuthProvider>
    </BrowserRouter>
  );
}