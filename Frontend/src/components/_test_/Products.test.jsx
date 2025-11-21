// Importo las funciones de testing necesarias
import { render, screen, within } from '@testing-library/react'
// Importo userEvent para simular interacciones del usuario (clicks, etc.)
import userEvent from '@testing-library/user-event'
// Importo MemoryRouter para simular navegación sin necesidad de un navegador real
import { MemoryRouter } from 'react-router-dom'
// Importo la página Products que quiero probar
import Products from '../../pages/Products'

// Función auxiliar para renderizar cualquier componente envuelto en MemoryRouter
const renderR = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

// Agrupo los tests relacionados con la página de productos
describe('Products page', () => {
  // Test 1: Verifico que se rendericen las 6 tarjetas de productos
  it('renderiza las 6 tarjetas de productos', () => {
    renderR(<Products onAdd={() => {}} />)

    // Obtengo todas las cards que se renderizan como <article>
    const cards = screen.getAllByRole('article')
    // Verifico que sean exactamente 6
    expect(cards.length).toBe(6)
  })

  // Test 2: Verifico que al clickear "Añadir 🛒" en la card de PC Gamer Bestia RGB
  // se llame la función onAdd con ese producto
  it('al clickear "Añadir 🛒" de PC Gamer Bestia RGB se llama onAdd con ese producto', async () => {
    const user = userEvent.setup() // preparo simulación de usuario
    const onAdd = vi.fn() // creo un mock de la función onAdd

    renderR(<Products onAdd={onAdd} />)

    // Encuentro el título del producto dentro de la card
    const heading = screen.getByRole('heading', { name: /pc gamer bestia rgb/i })

    // Subo hasta el elemento <article> que contiene esa card
    const card = heading.closest('article')
    expect(card).not.toBeNull()

    // Dentro de esa card, busco el botón "Añadir"
    const addButton = within(card).getByRole('button', { name: /añadir/i })

    // Simulo el click en el botón
    await user.click(addButton)

    // Verifico que la función onAdd se haya llamado exactamente una vez
    expect(onAdd).toHaveBeenCalledTimes(1)

    // Verifico que el producto pasado tenga al menos estos datos
    expect(onAdd.mock.calls[0][0]).toMatchObject({
      title: 'PC Gamer Bestia RGB',
      sku: 'PCGAMER002',
      price: 2450000
    })
  })
})