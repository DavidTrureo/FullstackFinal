// Importo el componente ProductCard, que representa cada tarjeta de producto
import ProductCard from "../components/ProductCard";

// Importo las imágenes de los productos desde la carpeta /imagenes
import pc_Gamer from "../imagenes/pc_gamer.webp";
import notebook_gamer from "../imagenes/notebook_gamer.jpg";
import gamer_auriculares from "../imagenes/gamer_auriculares.jpg";
import mouse_gamer from "../imagenes/mouse_gamer.jpg";
import teclado_gamer from "../imagenes/teclado_gamer.webp";
import silla_gamer from "../imagenes/silla_gamer.webp";

// Defino un arreglo constante con todos los productos disponibles
// Cada objeto incluye título, precio, SKU, imagen y descripción
const PRODUCTS = [
  {
    title: "Notebook Gamer Ultra Pro",
    price: 1899990,
    sku: "NOTEBOOK001",
    image: notebook_gamer,
    description: "Procesador i9, RTX 4080, 32GB RAM."
  },
  {
    title: "PC Gamer Bestia RGB",
    price: 2450000,
    sku: "PCGAMER002",
    image: pc_Gamer,
    description: "Gaming en 4K con iluminación RGB personalizable."
  },
  {
    title: "Auriculares Gamer Inmersivos",
    price: 89990,
    sku: "HEADSET003",
    image: gamer_auriculares,
    description: "Sonido 7.1 envolvente y cancelación de ruido."
  },
  {
    title: "Mouse Gamer Pro",
    price: 39990,
    sku: "MOUSE004",
    image: mouse_gamer,
    description: "Sensor óptico 16.000 DPI con RGB."
  },
  {
    title: "Teclado Mecánico RGB",
    price: 79990,
    sku: "TECLADO005",
    image: teclado_gamer,
    description: "Switches mecánicos + retroiluminación personalizable."
  },
  {
    title: "Silla Gamer Premium",
    price: 199990,
    sku: "SILLA006",
    image: silla_gamer,
    description: "Ergonómica, reclinable, con soporte lumbar."
  }
];

// Defino el componente Products, que renderiza la página de productos
// Recibe la función onAdd como prop, para manejar la acción de añadir al carrito
export default function Products({ onAdd }) {
  return (
    <>
      {/* Encabezado de la página con título y subtítulo */}
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Nuestros Productos</h1>
          <p className="lead">Descubre la mejor tecnología gamer al mejor precio</p>
        </div>
      </header>

      {/* Contenido principal: renderizo las tarjetas de productos */}
      <main className="container py-5">
        <div className="row">
          {PRODUCTS.map((p) => (
            <ProductCard
              key={p.sku}              // Uso el SKU como clave única
              image={p.image}          // Imagen del producto
              title={p.title}          // Título del producto
              description={p.description} // Descripción breve
              price={p.price}          // Precio en CLP
              color={p.color}          // Color (si está definido)
              onAdd={() => onAdd?.(p)} // Al hacer click en "Añadir", paso el producto completo
            />
          ))}
        </div>
      </main>
    </>
  );
}