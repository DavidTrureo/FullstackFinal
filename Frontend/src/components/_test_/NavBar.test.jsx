// Importo las funciones de testing necesarias desde React Testing Library
import { render, screen } from "@testing-library/react";
// Importo MemoryRouter para simular la navegación sin necesidad de un navegador real
import { MemoryRouter } from "react-router-dom";
// Importo el componente Navbar que quiero probar
import Navbar from "../Navbar";
// Importo el AuthProvider, que es el proveedor real del contexto de autenticación
import { AuthProvider } from "../../context/authContext"; // ✅ usar el provider real

// Función auxiliar que me permite renderizar el Navbar
// envuelto en el router y en el AuthProvider, tal como ocurre en la aplicación real
const renderWithProviders = (ui) => {
  return render(
    <MemoryRouter>
      <AuthProvider>{ui}</AuthProvider>
    </MemoryRouter>
  );
};

// Agrupo los tests relacionados con el Navbar
describe("Navbar", () => {
  // Test 1: Verifico que el contador del carrito se muestre correctamente
  it("muestra el contador del carrito", () => {
    renderWithProviders(<Navbar cartCount={5} />);
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  // Test 2: Si no hay usuario autenticado, deben aparecer los links de Login y Registrarse
  it("muestra Login/Registrarse si no está autenticado", () => {
    // Como no hay usuario en localStorage, AuthProvider arranca sin sesión
    renderWithProviders(<Navbar cartCount={0} />);
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /registrarse/i })).toBeInTheDocument();
  });

  // Test 3: Si hay usuario autenticado, el Navbar debe mostrar su nombre en el botón de cuenta
  it("muestra el nombre del usuario si está autenticado", () => {
    // Simulo un usuario en localStorage para que AuthProvider lo cargue automáticamente
    localStorage.setItem(
      "lug_current_user",
      JSON.stringify({ name: "María Paz", email: "maria@mail.com", tel: "123456789" })
    );

    // Renderizo el Navbar y verifico que aparezca el nombre del usuario
    renderWithProviders(<Navbar cartCount={0} />);
    expect(screen.getByRole("link", { name: /maría paz/i })).toBeInTheDocument();

    // Limpio el localStorage para no afectar otros tests
    localStorage.removeItem("lug_current_user");
  });
});