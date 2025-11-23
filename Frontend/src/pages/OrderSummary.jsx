import { useLocation, Link } from "react-router-dom";

// Formateo moneda chilena
const formatCLP = (n) =>
  (Number(n) || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

// Formateo fecha chilena
const formatFecha = (isoDate) =>
  new Date(isoDate).toLocaleString("es-CL", {
    dateStyle: "medium",
    timeStyle: "short",
  });

export default function OrderSummary() {
  const { state } = useLocation();
  const items = state?.items ?? [];
  const orderId = state?.id ?? "—";
  const createdAt = state?.createdAt;

  // Calcular total considerando cantidad
  const total = items.reduce(
    (acc, it) =>
      acc +
      (typeof it.price === "number"
        ? it.price * (it.quantity || 1)
        : Number(String(it.price).replace(/[^\d]/g, "")) * (it.quantity || 1) || 0),
    0
  );

  return (
    <>
      {/* Encabezado de éxito */}
      <header className="bg-success text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">¡Compra Finalizada!</h1>
          <p className="lead">Gracias por tu compra. Aquí tienes el resumen.</p>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="container py-5">
        {/* Alerta visual de éxito con ícono */}
        <div className="alert alert-success text-center mb-4 d-flex align-items-center justify-content-center" role="alert">
          <i className="bi bi-check-circle-fill me-2" style={{ fontSize: "1.5rem" }}></i>
          <span>
            <strong>¡Tu pedido ha sido procesado con éxito!</strong>  
            &nbsp;Número de Orden: #{orderId}
          </span>
        </div>

        <div className="card shadow-lg">
          <div className="card-body">
            <h4 className="card-title mb-4">Resumen del Pedido</h4>

            {/* Info de orden */}
            <div className="mb-3">
              <p><strong>Número de Orden:</strong> #{orderId}</p>
              {createdAt && <p><strong>Fecha:</strong> {formatFecha(createdAt)}</p>}
            </div>

            {/* Lista de productos */}
            <div className="mb-4">
              {items.length === 0 ? (
                <p>No se encontraron ítems del pedido.</p>
              ) : (
                <ul className="list-group">
                  {items.map((it, idx) => (
                    <li
                      key={idx}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <span>
                        {it.productName}{" "}
                        {it.quantity > 1 && (
                          <small className="text-muted">x{it.quantity}</small>
                        )}
                      </span>
                      <strong>{formatCLP(it.price * (it.quantity || 1))}</strong>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Total */}
            <div className="d-flex justify-content-between align-items-center mb-4 border-top pt-3">
              <h5>Total del Pedido:</h5>
              <h5 className="text-success">{formatCLP(total)}</h5>
            </div>

            {/* Botón volver */}
            <Link to="/" className="btn btn-primary w-100">
              Volver a la página principal
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}