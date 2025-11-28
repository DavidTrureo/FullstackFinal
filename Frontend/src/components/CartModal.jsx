// Defino el componente CartModal.
// Recibe como props el listado de productos en el carrito y varias funciones de control:
// - cartItems: arreglo con los productos [{ id, title, price, image, color, qty }]
// - onClearCart: vaciar todo el carrito
// - onCheckout: ir al proceso de compra
// - onIncItem: aumentar cantidad de un producto
// - onDecItem: disminuir cantidad de un producto
// - onRemoveLine: eliminar un producto completo del carrito
export default function CartModal({
  cartItems = [],
  onClearCart = () => {},
  onCheckout = () => {},
  onIncItem,
  onDecItem,
  onRemoveLine,
  isOpen = false,
  onClose = () => {},
}) {
  // Verifico si el carrito tiene productos
  const hasItems = cartItems.length > 0;

  // Paleta de colores para los items del carrito.
  // Usamos los nombres de las variables CSS que definimos.
  const itemColors = [
    "var(--primary)",
    "var(--secondary)",
    "var(--accent-green)",
    "var(--accent-orange)",
    "var(--accent-red)",
  ];
  // Función auxiliar: convierte un precio a número
  const toNumber = (p) =>
    typeof p === "number" ? p : Number(String(p).replace(/[^\d]/g, "") || 0);

  // Función auxiliar: formatea un número como moneda chilena (CLP)
  const formatCLP = (n) =>
    (Number(n) || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

  // Calculo el total sumando precio * cantidad de cada producto
  const total = cartItems.reduce(
    (sum, item) => sum + toNumber(item.price) * (item.qty || 1),
    0
  );

  // Render modal controlled by React to avoid Bootstrap JS conflicts
  return (
    <>
      <div
        className={`modal fade ${isOpen ? 'show' : ''}`}
        id="cartModal"
        tabIndex="-1"
        aria-labelledby="cartModalLabel"
        aria-hidden={!isOpen}
        style={isOpen ? { display: 'block' } : { display: 'none' }}
        onClick={(e) => {
          // clicking on backdrop area should close (only when click is on the backdrop itself)
          if (e.target === e.currentTarget) onClose?.();
        }}
      >
        {/* Prevent clicks inside the dialog from bubbling to the backdrop */}
        <div className="modal-dialog modal-lg modal-dialog-scrollable" onClick={(e) => e.stopPropagation()}>
          <div className="modal-content">
          
          {/* Header del modal */}
            <div className="modal-header">
            <h5 className="modal-title" id="cartModalLabel">Carrito de Compras</h5>
            <button type="button" className="btn-close btn-close-white" aria-label="Cerrar" onClick={() => onClose?.()}></button>
          </div>

          {/* Body del modal: listado de productos */}
          <div className="modal-body" id="cart-items">
            {hasItems ? (
              <>
                {cartItems.map((item, idx) => {
                  // display-friendly fields: support both `title` and `name`
                  const title = item?.title ?? item?.name ?? "";
                  const description = item?.description ?? "";
                  const unit = toNumber(item?.price ?? item?.cost ?? 0);
                  const qty = item?.qty || 1;
                  const lineTotal = unit * qty;

                  return (
                    <div
                      key={item?.id ?? idx}
                      className="cart-item d-flex align-items-center justify-content-between"
                      // Aplicamos el color correspondiente de forma cíclica
                      style={{
                        "--item-accent-color": itemColors[idx % itemColors.length],
                      }}
                    >
                      {/* Parte izquierda: imagen y detalles del producto */}
                      <div className="d-flex align-items-center">
                        {item?.image && (
                          <img
                            src={item.image}
                            alt={title}
                            className="cart-item-img me-3"
                          />
                        )}
                        <div>
                          <h6 className="mb-1">{title}</h6>
                          {description ? (
                            <small className="cart-item-description d-block">{description}</small>
                          ) : null}
                          <small className="precio-unitario d-block">
                            Precio unitario: {formatCLP(unit)}
                          </small>
                          {item?.color && (
                            <div className="product-color-pill mt-1">
                              Color: {item.color}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Parte derecha: controles de cantidad, subtotal y eliminar */}
                      <div className="d-flex align-items-center gap-3">
                        {/* Control de cantidad con botones + y − */}
                        <div className="quantity-control d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-light"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onDecItem?.(item);
                            }}
                            aria-label="Disminuir cantidad"
                          >
                            <i className="bi bi-dash" aria-hidden="true"></i>
                          </button>

                          <span className="px-2" style={{ minWidth: 24, textAlign: "center" }}>
                            {qty}
                          </span>

                          <button
                            type="button"
                            className="btn btn-sm btn-outline-light"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              onIncItem?.(item);
                            }}
                            aria-label="Aumentar cantidad"
                          >
                            <i className="bi bi-plus-lg" aria-hidden="true"></i>
                          </button>
                        </div>


                        {/* Subtotal de la línea */}
                        <div className="text-end">
                          <div className="fw-semibold">Subtotal</div>
                          <div>{formatCLP(lineTotal)}</div>
                        </div>

                        {/* Botón para eliminar el producto del carrito */}
                        <button
                          type="button"
                          className="btn btn-sm btn-danger"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onRemoveLine?.(item);
                          }}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  );
                })}

                {/* Total general del carrito */}
                <div className="d-flex justify-content-end mt-3">
                  <div className="text-end">
                    <div className="fw-semibold">Total</div>
                    <div className="fs-5 text-primary">{formatCLP(total)}</div>
                  </div>
                </div>
              </>
            ) : (
              <p>No hay productos en el carrito.</p>
            )}
          </div>

          {/* Footer del modal: acciones principales */}
          <div className="modal-footer">
            {/* Botón para vaciar el carrito */}
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClearCart}
              disabled={!hasItems}
            >
              Vaciar
            </button>

            {/* Botón para finalizar compra y pasar al checkout */}
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                onCheckout?.();
                onClose?.();
              }}
              disabled={!hasItems}
            >
              Finalizar compra
            </button>
          </div>
          </div>
        </div>
      </div>

      {/* backdrop rendered by React when open */}
      {isOpen ? <div className="modal-backdrop fade show"></div> : null}
    </>
  );
}