import React, { createContext, useContext, useState, useEffect, useRef } from 'react'

const CartContext = createContext(null)

/* Deriva a chave de storage a partir do usuário logado.
   Se não houver ninguém logado, usa 'cart_guest'. */
function cartKey() {
  try {
    const raw = localStorage.getItem('usuario')
    if (!raw) return 'cart_guest'
    const u = JSON.parse(raw)
    return u?.id ? `cart_${u.id}` : 'cart_guest'
  } catch {
    return 'cart_guest'
  }
}

function loadCart(key) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveCart(key, items) {
  try {
    localStorage.setItem(key, JSON.stringify(items))
  } catch {}
}

export function CartProvider({ children }) {
  const [currentKey, setCurrentKey] = useState(() => cartKey())
  const [cartItems, setCartItems]   = useState(() => loadCart(cartKey()))
  const [isCartOpen, setIsCartOpen] = useState(false)

  /* Detecta troca de conta ouvindo o storage e também na montagem */
  useEffect(() => {
    function syncUser() {
      const newKey = cartKey()
      if (newKey !== currentKey) {
        setCurrentKey(newKey)
        setCartItems(loadCart(newKey))
        setIsCartOpen(false)
      }
    }

    /* Troca detectada em outras abas */
    window.addEventListener('storage', syncUser)

    /* Polling leve para detectar login/logout na mesma aba
       (localStorage.setItem não dispara 'storage' na mesma janela) */
    const interval = setInterval(syncUser, 500)

    return () => {
      window.removeEventListener('storage', syncUser)
      clearInterval(interval)
    }
  }, [currentKey])

  /* Persiste sempre que o carrinho mudar */
  useEffect(() => {
    saveCart(currentKey, cartItems)
  }, [cartItems, currentKey])

  /* ── Ações do carrinho ─────────────────────── */

  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
  }

  const removeFromCart = (productId) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => setCartItems([])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
