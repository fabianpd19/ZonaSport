import axios from "axios"

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api"

// Configurar axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    "user-id": "default-user", // En producción, esto vendría del token JWT
  },
})

// API de productos
export const productsAPI = {
  getAll: async (filters = {}) => {
    const response = await api.get("/products", { params: filters })
    return response.data
  },

  getById: async (id) => {
    const response = await api.get(`/products/${id}`)
    return response.data
  },

  create: async (productData) => {
    const response = await api.post("/products", productData)
    return response.data
  },

  update: async (id, productData) => {
    const response = await api.put(`/products/${id}`, productData)
    return response.data
  },

  delete: async (id) => {
    const response = await api.delete(`/products/${id}`)
    return response.data
  },
}

// API del carrito
export const cartAPI = {
  getCart: async () => {
    const response = await api.get("/cart")
    return response.data
  },

  addToCart: async (productId, quantity, size, color) => {
    const response = await api.post("/cart/add", {
      productId,
      quantity,
      size,
      color,
    })
    return response.data
  },

  removeFromCart: async (itemId) => {
    const response = await api.delete(`/cart/remove/${itemId}`)
    return response.data
  },

  clearCart: async () => {
    const response = await api.post("/cart/clear")
    return response.data
  },
}

// API de usuarios
export const usersAPI = {
  register: async (userData) => {
    const response = await api.post("/users/register", userData)
    return response.data
  },

  login: async (credentials) => {
    const response = await api.post("/users/login", credentials)
    return response.data
  },
}

// API de órdenes
export const ordersAPI = {
  create: async (orderData) => {
    const response = await api.post("/orders", orderData)
    return response.data
  },
}

export default api
