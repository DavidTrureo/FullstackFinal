import { Routes, Route } from "react-router-dom";

// Páginas
import Home from "../pages/Home";
import Products from "../pages/Products";
import Contacto from "../pages/Contacto";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Checkout from "../pages/Checkout";
import OrderSummary from "../pages/OrderSummary";

// Ruta protegida
import RequireAuth from "../components/RequireAuth";

import { useCart } from "../hooks/useCart"; // Importar el hook

export default function AppRoutes() {
  const { cartItems, clearCart } = useCart(); // Usar el hook para las rutas que lo necesiten

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/productos" element={<Products />} />
      <Route path="/contacto" element={<Contacto />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
      <Route path="/checkout" element={<RequireAuth><Checkout cartItems={cartItems} onFinalize={clearCart} /></RequireAuth>} />
      <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
  );
}