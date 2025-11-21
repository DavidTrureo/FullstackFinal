// Importo las funciones de testing necesarias desde React Testing Library
import { render, screen } from '@testing-library/react'
// Importo userEvent para simular interacciones del usuario (clicks, etc.)
import userEvent from '@testing-library/user-event'
// Importo el componente ProductCard que quiero probar
import ProductCard from '../ProductCard'

// Agrupo los tests relacionados con ProductCard
describe('ProductCard', () => {
  // Defino un objeto base con las props que usaremos en los tests
  const base = {
    image: '/imagenes/notebook_gamer.jpg',
    title: 'Notebook Gamer Ultra Pro',
    description: 'Procesador i9, RTX 4080, 32GB RAM.',
    price: 1899990,
    color: 'Negro',
  }

  // Test 1: Verifico que se muestren correctamente el título, la descripción y el precio
  it('muestra título, descripción y precio formateado en CLP', () => {
    // Renderizo el componente con las props base
    render(<ProductCard {...base} onAdd={() => {}} />)

    // Verifico que el título aparezca en pantalla
    expect(screen.getByText(base.title)).toBeInTheDocument()
    // Verifico que la descripción aparezca en pantalla
    expect(screen.getByText(base.description)).toBeInTheDocument()

    // Verifico que el precio aparezca formateado en pesos chilenos (CLP)
    // Uso una expresión regular para no depender del separador exacto
    expect(screen.getByText(/\$?\s?1\.?899\.?990/)).toBeInTheDocument()
  })

  // Test 2: Verifico que al hacer click en el botón "Añadir 🛒" se dispare la función onAdd
  it('llama onAdd al clickear "Añadir 🛒"', async () => {
    const user = userEvent.setup() // preparo simulación de usuario
    const onAdd = vi.fn() // creo un mock de la función onAdd

    // Renderizo el componente con la función onAdd mockeada
    render(<ProductCard {...base} onAdd={onAdd} />)

    // Simulo un click en el botón "Añadir"
    await user.click(screen.getByRole('button', { name: /añadir/i }))
    // Verifico que la función onAdd se haya llamado exactamente una vez
    expect(onAdd).toHaveBeenCalledTimes(1)
  })
})