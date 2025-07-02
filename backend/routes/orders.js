const express = require("express")
const router = express.Router()

// POST /api/orders - Crear nueva orden (simulación)
router.post("/", async (req, res) => {
  try {
    const { items, total, customerInfo } = req.body

    // Simular procesamiento de orden
    const order = {
      id: Date.now().toString(),
      items,
      total,
      customerInfo,
      status: "confirmed",
      createdAt: new Date(),
    }

    // En una app real, aquí guardarías en la base de datos
    console.log("Nueva orden creada:", order)

    res.status(201).json({
      message: "Orden creada exitosamente",
      order,
    })
  } catch (error) {
    res.status(400).json({ message: "Error creando orden", error: error.message })
  }
})

module.exports = router
