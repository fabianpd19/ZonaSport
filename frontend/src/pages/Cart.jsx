"use client"

import { Link } from "react-router-dom"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import { useCart } from "../context/CartContext"

const Cart = () => {
  const { cart, removeFromCart, loading } = useCart()

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="card p-6">
              <div className="flex space-x-4">
                <div className="w-20 h-20 bg-gray-200 rounded"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-400 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h2>
          <p className="text-gray-600 mb-8">Agrega algunos productos para comenzar tu compra</p>
          <Link to="/products" className="btn-primary">
            Explorar Productos
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Carrito de Compras</h1>

      <div className="space-y-6">
        {cart.items.map((item) => (
          <div key={item._id} className="card p-6">
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Product Image */}
              <div className="w-full sm:w-32 h-32 flex-shrink-0">
                <img
                  src={item.product.image || "/placeholder.svg"}
                  alt={item.product.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>

              {/* Product Info */}
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-800">{item.product.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">{item.product.brand}</p>
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>Talla: {item.size}</span>
                      <span>Color: {item.color}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:items-end">
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="text-sm text-gray-500">Cantidad:</span>
                      <div className="flex items-center space-x-2">
                        <button
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          disabled={loading}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-50"
                          disabled={loading}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <span className="text-xl font-bold text-primary-600">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        disabled={loading}
                        className="text-red-500 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Cart Summary */}
        <div className="card p-6 bg-gray-50">
          <div className="flex justify-between items-center mb-6">
            <span className="text-xl font-semibold">Total:</span>
            <span className="text-2xl font-bold text-primary-600">${cart.total.toFixed(2)}</span>
          </div>

          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
            <Link to="/products" className="btn-secondary flex-1 text-center">
              Seguir Comprando
            </Link>
            <Link to="/checkout" className="btn-primary flex-1 text-center">
              Proceder al Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
