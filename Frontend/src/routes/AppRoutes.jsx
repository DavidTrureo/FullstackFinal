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

// Recibe props del carrito desde App.jsx
export default function AppRoutes({ cartItems, onAdd, onFinalize }) {
return (
    <Routes>
    <Route path="/" element={<Home onAdd={onAdd} />} />
    <Route path="/productos" element={<Products onAdd={onAdd} />} />
    <Route path="/contacto" element={<Contacto />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/profile" element={<RequireAuth><Profile /></RequireAuth>} />
    <Route path="/checkout" element={<Checkout cartItems={cartItems} onFinalize={onFinalize} />} />
    <Route path="/order-summary" element={<OrderSummary />} />
    </Routes>
);
}