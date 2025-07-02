const express = require("express")
const Product = require("../models/Product")
const router = express.Router()

// GET /api/products - Obtener todos los productos
router.get("/", async (req, res) => {
  try {
    const { category, brand, minPrice, maxPrice, featured } = req.query
    const filter = {}

    if (category) filter.category = category
    if (brand) filter.brand = brand
    if (featured) filter.featured = featured === "true"
    if (minPrice || maxPrice) {
      filter.price = {}
      if (minPrice) filter.price.$gte = Number(minPrice)
      if (maxPrice) filter.price.$lte = Number(maxPrice)
    }

    const products = await Product.find(filter).sort({ createdAt: -1 })
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo productos", error: error.message })
  }
})

// GET /api/products/:id - Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json(product)
  } catch (error) {
    res.status(500).json({ message: "Error obteniendo producto", error: error.message })
  }
})

// POST /api/products - Crear nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = new Product(req.body)
    await product.save()
    res.status(201).json(product)
  } catch (error) {
    res.status(400).json({ message: "Error creando producto", error: error.message })
  }
})

// PUT /api/products/:id - Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json(product)
  } catch (error) {
    res.status(400).json({ message: "Error actualizando producto", error: error.message })
  }
})

// DELETE /api/products/:id - Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" })
    }
    res.json({ message: "Producto eliminado correctamente" })
  } catch (error) {
    res.status(500).json({ message: "Error eliminando producto", error: error.message })
  }
})

module.exports = router
