// Importo el componente ProductCard, que se encarga de mostrar cada producto individual
import ProductCard from "./ProductCard";
import pc_Gamer from "../imagenes/pc_gamer.webp";
import notebook_Gamer from "../imagenes/notebook_gamer.jpg";
import gamer_auriculares from "../imagenes/gamer_auriculares.jpg";

// Defino un arreglo constante con los productos destacados.
// Cada producto tiene título, precio, SKU, color, imagen y descripción.
const FEATURED = [
  {
    title: "Notebook Gamer Ultra Pro",
    price: 1899990,
    sku: "NOTEBOOK001",
    image: notebook_Gamer,
    description: "Ideal para los gamers más exigentes. Procesador i9, RTX 4080."
  },
  {
    title: "PC Gamer Bestia RGB",
    price: 2450000,
    sku: "PCGAMER002",
    image: pc_Gamer,
    description: "Experiencia gaming en 4K con iluminación RGB personalizable."
  },
  {
    title: "Auriculares Gamer Inmersivos",
    price: 89990,
    sku: "HEADSET003",
    image: gamer_auriculares,
    description: "Sonido 7.1 envolvente y cancelación de ruido."
  }
];

// Defino el componente FeaturedProducts.
// Recibe la función onAdd como prop, que se usa para agregar productos al carrito.
export default function FeaturedProducts({ onAdd }) {
  return (
    <section className="container py-5">
      {/* Título de la sección */}
      <h2 className="text-center mb-5" style={{ color: "#f7f5f8ff" }} >Productos Destacados</h2>

      {/* Contenedor con Bootstrap para organizar los productos en filas y columnas */}
      <div className="row g-4 justify-content-center">
        {/* Recorro el arreglo FEATURED y por cada producto renderizo un ProductCard */}
        {FEATURED.map((p) => (
          // Uso el SKU como clave única y paso todas las propiedades del producto con spread operator {...p}
          // Además, paso la función onAdd para que al hacer clic se agregue al carrito
          <ProductCard key={p.sku} {...p} onAdd={() => onAdd?.(p)} />
        ))}
      </div>
    </section>
  );
}