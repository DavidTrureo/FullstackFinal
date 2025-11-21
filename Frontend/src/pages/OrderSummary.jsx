// Importo useLocation y Link desde react-router-dom.
// - useLocation: me permite acceder al estado que se pasó al navegar desde el checkout.
// - Link: me permite crear enlaces internos sin recargar la página.
import { useLocation, Link } from "react-router-dom";

// Función auxiliar para formatear números como moneda chilena (CLP).
const formatCLP = (n) =>
  (Number(n) || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

// Defino el componente OrderSummary.
// Aquí muestro el resumen final de la compra después del checkout.
export default function OrderSummary() {
  // Obtengo el estado enviado desde el checkout (los ítems del carrito).
  const { state } = useLocation();
  const items = state?.items ?? [];

  // Calculo el total sumando los precios de todos los ítems.
  const total = items.reduce(
    (acc, it) =>
      acc +
      (typeof it.price === "number"
        ? it.price
        : Number(String(it.price).replace(/[^\d]/g, "")) || 0),
    0
  );

  return (
    <>
      {/* Encabezado de confirmación de compra */}
      <header className="bg-success text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">¡Compra Finalizada!</h1>
          <p className="lead">Gracias por tu compra. Aquí tienes el resumen.</p>
        </div>
      </header>

      {/* Contenido principal: tarjeta con resumen del pedido */}
      <main className="container py-5">
        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title mb-4">Resumen del Pedido</h4>
            
            {/* Listado de productos comprados */}
            <div className="mb-4">
              {items.length === 0 ? (
                <p>No se encontraron ítems del pedido.</p>
              ) : (
                <ul className="list-group">
                  {items.map((it) => (
                    <li
                      key={it.sku}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>{it.title}</span>
                      <strong>{formatCLP(it.price)}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Total del pedido */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-top pt-3">
              <h5>Total del Pedido:</h5>
              <h5 className="text-success">{formatCLP(total)}</h5>
            </div>

            {/* Botón para volver a la página principal */}
            <Link to="/" className="btn btn-primary w-100">
              Volver a la página principal
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}