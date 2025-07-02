# Zona Sport - Ecommerce de Ropa Deportiva

Un ecommerce completo de ropa deportiva construido con React, Node.js, Express y MongoDB.

## 🚀 Características

- **Frontend React** con Vite, React Router y Tailwind CSS
- **Backend API RESTful** con Node.js, Express y MongoDB
- **Gestión de carrito** en tiempo real
- **Filtros de productos** por categoría, marca y precio
- **Checkout completo** con simulación de pago
- **Diseño responsive** y moderno
- **Docker** para fácil desarrollo y despliegue

## 📋 Requisitos Previos

- Docker y Docker Compose instalados
- Node.js 18+ (opcional, para desarrollo local)

## 🛠️ Instalación y Configuración

### Opción 1: Con Docker (Recomendado)

1. **Clonar el repositorio**
\`\`\`bash
git clone <tu-repositorio>
cd zona-sport
\`\`\`

2. **Crear la estructura de carpetas**
\`\`\`bash
mkdir frontend backend
\`\`\`

3. **Copiar los archivos** del proyecto a sus respectivas carpetas según la estructura mostrada

4. **Levantar los servicios**
\`\`\`bash
docker-compose up -d
\`\`\`

5. **Poblar la base de datos**
\`\`\`bash
docker-compose exec backend npm run seed
\`\`\`

6. **Acceder a la aplicación**
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- MongoDB: localhost:27017

### Opción 2: Desarrollo Local

1. **Backend**
\`\`\`bash
cd backend
npm install
npm run dev
\`\`\`

2. **Frontend**
\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

3. **MongoDB**
Asegúrate de tener MongoDB corriendo localmente o usa MongoDB Atlas.

## 📁 Estructura del Proyecto

\`\`\`
zona-sport/
├── docker-compose.yml
├── Dockerfile.frontend
├── Dockerfile.backend
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── services/
│   │   └── ...
│   ├── package.json
│   └── ...
├── backend/
│   ├── models/
│   ├── routes/
│   ├── scripts/
│   ├── server.js
│   ├── package.json
│   └── ...
└── README.md
\`\`\`

## 🔌 API Endpoints

### Productos
- `GET /api/products` - Obtener todos los productos
- `GET /api/products/:id` - Obtener producto por ID
- `POST /api/products` - Crear producto
- `PUT /api/products/:id` - Actualizar producto
- `DELETE /api/products/:id` - Eliminar producto

### Carrito
- `GET /api/cart` - Obtener carrito del usuario
- `POST /api/cart/add` - Agregar producto al carrito
- `DELETE /api/cart/remove/:itemId` - Remover item del carrito
- `POST /api/cart/clear` - Limpiar carrito

### Usuarios
- `POST /api/users/register` - Registrar usuario
- `POST /api/users/login` - Iniciar sesión

### Órdenes
- `POST /api/orders` - Crear nueva orden

## 🎯 Funcionalidades Principales

### Frontend
- **Página de inicio** con productos destacados
- **Catálogo de productos** con filtros y búsqueda
- **Detalle de producto** con selección de talla y color
- **Carrito de compras** interactivo
- **Checkout** completo con formulario de pago
- **Navegación responsive** con contador de carrito

### Backend
- **API RESTful** completa y documentada
- **Modelos de datos** bien estructurados
- **Validación** de datos de entrada
- **Manejo de errores** consistente
- **Seed script** para datos de prueba

## 🔧 Comandos Útiles

\`\`\`bash
# Levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f

# Poblar base de datos
docker-compose exec backend npm run seed

# Parar servicios
docker-compose down

# Rebuild servicios
docker-compose up --build
\`\`\`

## 🌟 Próximas Mejoras

- [ ] Autenticación JWT completa
- [ ] Panel de administración
- [ ] Integración con pasarela de pago real
- [ ] Sistema de reseñas y calificaciones
- [ ] Wishlist/Favoritos
- [ ] Notificaciones push
- [ ] Optimización de imágenes
- [ ] Tests unitarios e integración

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👨‍💻 Autor

Tu Nombre - [tu-email@ejemplo.com](mailto:tu-email@ejemplo.com)

Proyecto Link: [https://github.com/tu-usuario/zona-sport](https://github.com/tu-usuario/zona-sport)
# ZonaSport
