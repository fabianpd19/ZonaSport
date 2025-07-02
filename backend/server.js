const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://admin:password123@localhost:27017/zonasport?authSource=admin")
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("❌ Error conectando a MongoDB:", err))

// Rutas
app.use("/api/products", require("./routes/products"))
app.use("/api/users", require("./routes/users"))
app.use("/api/cart", require("./routes/cart"))
app.use("/api/orders", require("./routes/orders"))

// Ruta de prueba
app.get("/api/health", (req, res) => {
  res.json({ message: "Zona Sport API funcionando correctamente! 🏃‍♂️" })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`)
})
