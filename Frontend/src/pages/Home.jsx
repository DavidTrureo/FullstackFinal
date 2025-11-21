// Importo el componente Hero, que representa la sección principal de bienvenida
import Hero from "../components/Hero";

// Importo FeaturedProducts, que muestra productos destacados en la página inicial
import FeaturedProducts from "../components/FeaturedProducts";

// Defino el componente Home. Recibe la función onAdd como prop,
// que se usa para agregar productos al carrito desde la sección de destacados.
export default function Home({ onAdd }) {
  return (
    <>
      {/* Sección principal de bienvenida con un Hero visual */}
      <Hero />

      {/* Sección de productos destacados, con la opción de agregar al carrito */}
      <FeaturedProducts onAdd={onAdd} />


    </>
  );
}