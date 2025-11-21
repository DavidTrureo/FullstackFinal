// Importo useNavigate desde react-router-dom.
// Este hook me permite redirigir al usuario a otra ruta después de finalizar la compra.
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext"; // Asegúrate de que la ruta sea correcta

// Defino el componente Checkout.
// Recibe como props:
// - cartItems: los productos que están en el carrito.
// - onFinalize: función que se ejecuta al terminar la compra (por ejemplo, limpiar el carrito).
export default function Checkout({ cartItems = [], onFinalize }) {
  const navigate = useNavigate();
  const { user } = useAuth(); // Obtenemos los datos del usuario loggeado

  // Estado del formulario
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    direccion: "",
    metodoPago: "",
  });

  // Cuando el usuario cambia (se loggea o desloggea), actualizamos los campos
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

  // Manejo de cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Envío del formulario
  const onSubmit = (e) => {
    e.preventDefault();
    onFinalize?.(); // Limpio el carrito si corresponde
    navigate("/order-summary", { state: { items: cartItems } });
  };

  return (
    <>
      {/* Encabezado */}
      <header className="bg-primary text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Finalizar tu Compra</h1>
          <p className="lead">Completa tus datos para procesar tu pedido.</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container py-5">
        <section>
          <h2 className="text-center mb-4">Detalles de Envío y Pago</h2>

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

            {/* Botones */}
            <div className="col-12">
              <button className="btn btn-primary" type="submit">
                Finalizar Pedido
              </button>
              <button
                className="btn btn-secondary ms-2"
                type="reset"
                onClick={() =>
                  setFormData({
                    name: user?.name || "",
                    email: user?.email || "",
                    tel: user?.tel || "",
                    direccion: "",
                    metodoPago: "",
                  })
                }
              >
                Limpiar
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}