import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { apiFetch } from "../services/api";

export default function FeaturedProducts({ onAdd }) {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    async function load() {
      const res = await apiFetch("/products");
      if (res.ok && Array.isArray(res.data)) {
        setFeatured(res.data.slice(0, 3)); // o aleatorios si prefieres
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
            onAdd={() => onAdd?.(p)}
          />
        ))}
      </div>
    </section>
  );
}