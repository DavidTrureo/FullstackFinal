// Defino el componente ProductCard.
// Recibe como props: imagen, título, descripción, precio, color y la función onAdd.
export default function ProductCard({ image, title, description, price, color, onAdd }) {
  
  // Formateo el precio: si es un número, lo convierto a formato de moneda chilena (CLP).
  // Si no es número, simplemente lo muestro tal cual.
  const priceLabel = typeof price === "number"
    ? price.toLocaleString("es-CL", { style: "currency", currency: "CLP" })
    : price;

  return (
    // Uso clases de Bootstrap para organizar el producto en columnas responsivas
    <article className="col-md-4 col-sm-6 mb-4">
      <div className="card h-100 shadow-sm product-card">
        
        {/* Imagen del producto */}
        <img src={image} className="card-img-top" alt={title} />
        
        {/* Contenido del producto */}
        <div className="card-body d-flex flex-column">
          {/* Título del producto */}
          <h5 className="card-title">{title}</h5>
          
          {/* Descripción del producto */}
          <p className="card-text text-muted flex-grow-1">{description}</p>
          
          {/* Si el producto tiene color definido, lo muestro en una etiqueta */}
          {color && <span className="product-color-pill">Color: {color}</span>}
          
          {/* Sección inferior: precio y botón de añadir al carrito */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            {/* Precio formateado en CLP */}
            <span className="fs-5 fw-bold text-primary">{priceLabel}</span>
            
            {/* Botón para añadir el producto al carrito */}
            <button className="btn btn-primary" onClick={onAdd}>Añadir 🛒</button>
          </div>
        </div>
      </div>
    </article>
  );
}