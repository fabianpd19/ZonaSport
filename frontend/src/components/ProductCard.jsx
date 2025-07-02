"use client"

import { Link } from "react-router-dom"
import { ShoppingCart } from "lucide-react"
import { useCart } from "../context/CartContext"

const ProductCard = ({ product }) => {
  const { addToCart, loading } = useCart()

  const handleAddToCart = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const success = await addToCart(product._id, 1, product.sizes[0], product.colors[0])

    if (success) {
      alert("Producto agregado al carrito!")
    } else {
      alert("Error agregando producto al carrito")
    }
  }

  return (
    <div className="card overflow-hidden hover:shadow-lg transition-shadow">
      <Link to={`/products/${product._id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg text-gray-800 mb-1">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-primary-600">${product.price}</span>
            <span className="text-sm text-gray-500">{product.brand}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-1">
              {product.colors.slice(0, 3).map((color, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                  {color}
                </span>
              ))}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={loading || product.stock === 0}
              className="btn-primary flex items-center space-x-1 text-sm disabled:opacity-50"
            >
              <ShoppingCart size={16} />
              <span>Agregar</span>
            </button>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
