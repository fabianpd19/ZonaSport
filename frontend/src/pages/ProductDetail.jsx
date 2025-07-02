"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ShoppingCart, Heart, Star } from "lucide-react"
import { productsAPI } from "../services/api"
import { useCart } from "../context/CartContext"

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addToCart, loading: cartLoading } = useCart()

  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    loadProduct()
  }, [id])

  const loadProduct = async () => {
    try {
      setLoading(true)
      const data = await productsAPI.getById(id)
      setProduct(data)
      setSelectedSize(data.sizes[0] || "")
      setSelectedColor(data.colors[0] || "")
    } catch (error) {
      console.error("Error cargando producto:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      alert("Por favor selecciona talla y color")
      return
    }

    const success = await addToCart(product._id, quantity, selectedSize, selectedColor)

    if (success) {
      alert("Producto agregado al carrito!")
    } else {
      alert("Error agregando producto al carrito")
    }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-square bg-gray-200 rounded-lg"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-20 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">Producto no encontrado</p>
          <button onClick={() => navigate("/products")} className="btn-primary mt-4">
            Volver a Productos
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-primary-600 mb-6">
        <ArrowLeft size={20} className="mr-2" />
        Volver
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg">
          <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-3xl font-bold text-primary-600">${product.price}</span>
              <span className="text-lg text-gray-500">{product.brand}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={20} fill="currentColor" />
                ))}
              </div>
              <span className="text-gray-600">(4.8) 124 reseñas</span>
            </div>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Talla</h3>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded-lg font-medium ${
                    selectedSize === size
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 border rounded-lg font-medium ${
                    selectedColor === color
                      ? "border-primary-600 bg-primary-50 text-primary-600"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Cantidad</h3>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                -
              </button>
              <span className="text-lg font-medium w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50"
              >
                +
              </button>
            </div>
            <p className="text-sm text-gray-500 mt-2">Stock disponible: {product.stock}</p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={cartLoading || product.stock === 0}
              className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              <ShoppingCart size={20} />
              <span>{product.stock === 0 ? "Sin Stock" : "Agregar al Carrito"}</span>
            </button>

            <button className="w-full btn-secondary flex items-center justify-center space-x-2">
              <Heart size={20} />
              <span>Agregar a Favoritos</span>
            </button>
          </div>

          {/* Product Details */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-semibold mb-3">Detalles del Producto</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• Categoría: {product.category}</li>
              <li>• Marca: {product.brand}</li>
              <li>• Tallas disponibles: {product.sizes.join(", ")}</li>
              <li>• Colores disponibles: {product.colors.join(", ")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
