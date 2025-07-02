const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const router = express.Router()

// POST /api/users/register - Registrar usuario
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(400).json({ message: "El usuario ya existe" })
    }

    // Crear nuevo usuario
    const user = new User({ name, email, password })
    await user.save()

    // Generar token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "tu_jwt_secret_super_seguro", {
      expiresIn: "7d",
    })

    res.status(201).json({
      message: "Usuario registrado exitosamente",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(400).json({ message: "Error registrando usuario", error: error.message })
  }
})

// POST /api/users/login - Iniciar sesión
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    // Buscar usuario
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" })
    }

    // Verificar password
    const isValidPassword = await user.comparePassword(password)
    if (!isValidPassword) {
      return res.status(401).json({ message: "Credenciales inválidas" })
    }

    // Generar token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || "tu_jwt_secret_super_seguro", {
      expiresIn: "7d",
    })

    res.json({
      message: "Inicio de sesión exitoso",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: "Error iniciando sesión", error: error.message })
  }
})

module.exports = router
