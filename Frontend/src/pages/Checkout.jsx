import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";

export default function Checkout({ cartItems = [], onFinalize }) {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    direccion: "",
    metodoPago: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        tel: user.tel || "",
      }));
    } else {
      setFormData({
        name: "",
        email: "",
        tel: "",
        direccion: "",
        metodoPago: "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const orderRequest = {
      customerName: formData.name,
      customerEmail: formData.email,
      customerTel: formData.tel,
      items: cartItems.map((it) => ({
        productName: it.title,
        price: it.price,
        quantity: it.qty || 1, // CORREGIDO: usar qty
      })),
    };

    try {
      const res = await fetch("http://localhost:8080/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequest),
      });

      if (!res.ok) throw new Error("Error al crear la orden");

      const savedOrder = await res.json();

      onFinalize?.(); // Limpia el carrito
      navigate("/order-summary", { state: savedOrder }); // Paso el DTO completo
    } catch (err) {
      console.error("Error al procesar la orden:", err);
      alert("No se pudo procesar la orden");
    }
  };

  return (
    <main className="container py-5">
      <form className="row g-3" onSubmit={onSubmit}>
        {/* Nombre */}
        <div className="col-md-6">
          <label className="form-label">Nombre Completo</label>
          <input
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
            readOnly={!!user}
          />
        </div>

        {/* Correo */}
        <div className="col-md-6">
          <label className="form-label">Correo Electrónico</label>
          <input
            name="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
            readOnly={!!user}
          />
        </div>

        {/* Teléfono */}
        <div className="col-md-6">
          <label className="form-label">Teléfono</label>
          <input
            name="tel"
            className="form-control"
            value={formData.tel}
            onChange={handleChange}
            required
            readOnly={!!user}
          />
        </div>

        {/* Dirección */}
        <div className="col-md-6">
          <label className="form-label">Dirección de Envío</label>
          <input
            name="direccion"
            className="form-control"
            value={formData.direccion}
            onChange={handleChange}
            required
          />
        </div>

        {/* Método de pago */}
        <div className="col-md-12">
          <label className="form-label">Método de Pago</label>
          <select
            name="metodoPago"
            className="form-select"
            value={formData.metodoPago}
            onChange={handleChange}
            required
          >
            <option value="">Selecciona…</option>
            <option value="debito">Débito</option>
            <option value="credito">Crédito</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        {/* Botón */}
        <div className="col-12">
          <button className="btn btn-primary" type="submit">
            Finalizar Pedido
          </button>
        </div>
      </form>
    </main>
  );
}