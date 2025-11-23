import ProductCard from "../components/ProductCard";
import { apiFetch } from "../services/api";
import { useEffect, useState } from "react";

export default function Products({ onAdd }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await apiFetch("/products");
      if (res.ok && Array.isArray(res.data)) {
        setItems(res.data);
      } else {
        console.error("Error cargando productos:", res.error || res);
      }
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <header className="bg-dark text-white text-center py-5 mt-5">
        <div className="container pt-5">
          <h1 className="display-4">Nuestros Productos</h1>
          <p className="lead">Descubre la mejor tecnología gamer al mejor precio</p>
        </div>
      </header>

      <main className="container py-5">
        {loading ? <p className="text-center">Cargando productos…</p> : null}
        <div className="row">
          {items.map((p) => (
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
      </main>
    </>
  );
}