// Importo las funciones de testing necesarias
import { render, screen } from '@testing-library/react'
// Importo userEvent para simular interacción del usuario (clicks, etc.)
import userEvent from '@testing-library/user-event'
// Importo el componente CartModal que quiero probar
import CartModal from '../CartModal'

// Función auxiliar para formatear números como moneda chilena (CLP)
const fmt = (n) => n.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })

// Agrupo los tests relacionados con el componente CartModal
describe('CartModal', () => {
  // Test 1: Verifico que se muestre el mensaje correcto cuando el carrito está vacío
  it('muestra mensaje cuando el carrito está vacío', () => {
    render(<CartModal cartItems={[]} />)
    expect(screen.getByText(/No hay productos en el carrito/i)).toBeInTheDocument()
  })

  // Test 2: Verifico que se calculen correctamente los subtotales y el total
  it('calcula subtotal por línea y total usando qty', () => {
    const items = [
      { id: 'NOTEBOOK001', title: 'Notebook', price: 1000, qty: 2 },
      { id: 'MOUSE004', title: 'Mouse',    price:  500, qty: 3 },
    ]

    render(<CartModal cartItems={items} />)

    // Subtotales: Notebook (1000 * 2 = 2000) y Mouse (500 * 3 = 1500)
    expect(screen.getAllByText(fmt(2000)).length).toBeGreaterThan(0)
    expect(screen.getAllByText(fmt(1500)).length).toBeGreaterThan(0)

    // Total = 2000 + 1500 = 3500
    expect(screen.getByText(fmt(3500))).toBeInTheDocument()
  })

  // Test 3: Verifico que los botones + y − disparen las funciones correspondientes
  it('dispara onIncItem y onDecItem al clickear + y −', async () => {
    const user = userEvent.setup()
    const onIncItem = vi.fn() // mock para aumentar cantidad
    const onDecItem = vi.fn() // mock para disminuir cantidad

    const items = [{ id: 'HEADSET003', title: 'Headset', price: 1000, qty: 1 }]

    render(
      <CartModal
        cartItems={items}
        onIncItem={onIncItem}
        onDecItem={onDecItem}
      />
    )

    // Botón +: simulo click y espero que se llame onIncItem
    const plus = screen.getByRole('button', { name: /aumentar cantidad/i, hidden: true })
    await user.click(plus)
    expect(onIncItem).toHaveBeenCalledTimes(1)

    // Botón −: simulo click y espero que se llame onDecItem
    const minus = screen.getByRole('button', { name: /disminuir cantidad/i, hidden: true })
    await user.click(minus)
    expect(onDecItem).toHaveBeenCalledTimes(1)
  })
})