"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { cartAPI } from "../services/api"

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart debe ser usado dentro de CartProvider")
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [], total: 0 })
  const [loading, setLoading] = useState(false)

  // Cargar carrito al iniciar
  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = async () => {
    try {
      setLoading(true)
      const cartData = await cartAPI.getCart()
      setCart(cartData)
    } catch (error) {
      console.error("Error cargando carrito:", error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = async (productId, quantity = 1, size, color) => {
    try {
      setLoading(true)
      const updatedCart = await cartAPI.addToCart(productId, quantity, size, color)
      setCart(updatedCart)
      return true
    } catch (error) {
      console.error("Error agregando al carrito:", error)
      return false
    } finally {
      setLoading(false)
    }
  }

  const removeFromCart = async (itemId) => {
    try {
      setLoading(true)
      const updatedCart = await cartAPI.removeFromCart(itemId)
      setCart(updatedCart)
    } catch (error) {
      console.error("Error removiendo del carrito:", error)
    } finally {
      setLoading(false)
    }
  }

  const clearCart = async () => {
    try {
      setLoading(true)
      await cartAPI.clearCart()
      setCart({ items: [], total: 0 })
    } catch (error) {
      console.error("Error limpiando carrito:", error)
    } finally {
      setLoading(false)
    }
  }

  const getCartItemsCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0)
  }

  const value = {
    cart,
    loading,
    addToCart,
    removeFromCart,
    clearCart,
    getCartItemsCount,
    refreshCart: loadCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
