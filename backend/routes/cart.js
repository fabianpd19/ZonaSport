const express = require("express")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const router = express.Router()

// Middleware simple para obtener userId (en producción usar JWT)
const getUserId = (req, res, next) => {
  req.userId = req.headers["user-id"] || "default-user"
  next()
}

// GET /api/cart - Obtener carrito del usuario
router.get("/", getUserId, async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.userId }).populate("items.product")

    if (!cart) {
      cart = new Cart({ user: req.userId, items: [], total: 0 })
      await cart.save()
    }

    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo carrito", error: error.message })
  }
})

// POST /api/cart/add - Agregar producto al carrito
router.post("/add", getUserId, async (req, res) => {
  try {
    const { productId, quantity = 1, size, color } = req.body

    const product = await Product.findById(productId)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }

    let cart = await Cart.findOne({ user: req.userId })
    if (!cart) {
      cart = new Cart({ user: req.userId, items: [] })
    }

    // Verificar si el producto ya está en el carrito
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId && item.size === size && item.color === color,
    )

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      cart.items.push({ product: productId, quantity, size, color })
    }

    // Calcular total
    await cart.populate("items.product")
    cart.total = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(400).json({ message: "Error agregando al carrito", error: error.message })
  }
})

// DELETE /api/cart/remove/:itemId - Remover item del carrito
router.delete("/remove/:itemId", getUserId, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId })
    if (!cart) {
      return res.status(404).json({ message: "Carrito no encontrado" })
    }

    cart.items = cart.items.filter((item) => item._id.toString() !== req.params.itemId)

    // Recalcular total
    await cart.populate("items.product")
    cart.total = cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)

    await cart.save()
    res.json(cart)
  } catch (error) {
    res.status(500).json({ message: "Error removiendo del carrito", error: error.message })
  }
})

// POST /api/cart/clear - Limpiar carrito
router.post("/clear", getUserId, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId })
    if (cart) {
      cart.items = []
      cart.total = 0
      await cart.save()
    }
    res.json({ message: "Carrito limpiado" })
  } catch (error) {
    res.status(500).json({ message: "Error limpiando carrito", error: error.message })
  }
})

module.exports = router
