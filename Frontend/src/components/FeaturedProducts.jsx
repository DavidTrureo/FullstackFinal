import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { apiFetch } from "../services/api";
import { useCart } from "../hooks/useCart"; // 1. Importar el hook

export default function FeaturedProducts() { // 2. Eliminar la prop onAdd
  const [featured, setFeatured] = useState([]);
  const { addItem } = useCart(); // 3. Obtener addItem desde el contexto

  useEffect(() => {
    async function load() {
      const res = await apiFetch("/products");
      // Aseguramos que res.data sea un array antes de usarlo.
      // Si no lo es, usamos un array vacío para evitar errores.
      const products = Array.isArray(res.data) ? res.data : [];
      if (res.ok) {
        setFeatured(products.slice(0, 3)); // Cortamos los primeros 3 productos
      } else {
        console.error("No se pudieron cargar productos destacados:", res.error || res);
      }
    }
    load();
  }, []);

  return (
    <section className="container py-5">
      <h2 className="text-center mb-5" style={{ color: "#f7f5f8ff" }}>
        Productos Destacados
      </h2>

      <div className="row g-4 justify-content-center">
        {featured.map((p) => (
          <ProductCard
            key={p.id}
            image={p.image}
            title={p.name}
            description={p.description}
            price={p.price}
            color={p.color}
            onAdd={() => addItem(p)} // 4. Usar la función del contexto directamente
          />
        ))}
      </div>
    </section>
  );
}