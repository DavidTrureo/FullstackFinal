import { createContext, useState, useEffect } from "react";

// 1. Crear el contexto
const CartContext = createContext();

// 3. Crear el proveedor del contexto
export function CartProvider({ children }) {
  // Toda la lógica del carrito que estaba en App.jsx se mueve aquí
    const [cartItems, setCartItems] = useState(() => {
    try {
        const saved = localStorage.getItem("cartItems");
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
    });

    useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = (item) => {
    setCartItems((prev) => {
        const id = item.sku || item.id;
        const idx = prev.findIndex((p) => p.id === id);
        if (idx !== -1) {
        return prev.map((p, i) =>
            i === idx ? { ...p, qty: (p.qty || 1) + 1 } : p
        );
        }
        const normalized = {
        ...item,
        id,
        qty: 1,
        title: item.title ?? item.name ?? "",
        price: item.price ?? item.cost ?? 0,
        image: item.image ?? item.img ?? null,
        description: item.description ?? item.desc ?? "",
        };
        return [...prev, normalized];
    });
    };

    const incItem = (item) => {
    setCartItems((prev) =>
        prev.map((p) =>
        p.id === item.id ? { ...p, qty: (p.qty || 1) + 1 } : p
        )
    );
    };

    const decItem = (item) => {
    setCartItems((prev) =>
        prev.flatMap((p) => {
        if (p.id !== item.id) return [p];
        const nextQty = (p.qty || 1) - 1;
        return nextQty > 0 ? [{ ...p, qty: nextQty }] : [];
        })
    );
    };

    const removeLine = (item) => {
    setCartItems((prev) => prev.filter((p) => p.id !== item.id));
    };

    const clearCart = () => setCartItems([]);

  // El valor que proveerá el contexto
    const value = { cartItems, addItem, incItem, decItem, removeLine, clearCart };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// Exportamos el contexto aquí para que el hook pueda usarlo
export { CartContext };