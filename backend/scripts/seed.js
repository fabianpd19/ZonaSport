const mongoose = require("mongoose");
const Product = require("../models/Product");
require("dotenv").config();

const sampleProducts = [
  {
    name: "Camiseta Nike Dri-FIT",
    description:
      "Camiseta deportiva con tecnología Dri-FIT para mantenerte seco y cómodo durante el ejercicio.",
    price: 45.99,
    category: "camisetas",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Blanco", "Azul"],
    stock: 50,
    featured: true,
    image:
      "https://static.nike.com/a/images/t_default/afc2b0d6-089e-4e45-a98b-4b6ac278a24e/dri-fit-camiseta-de-entrenamiento-de-manga-corta-con-estampado-F8pJpP.png",
  },
  {
    name: "Pantalón Adidas Training",
    description:
      "Pantalón deportivo cómodo y flexible, perfecto para entrenamientos intensos.",
    price: 65.99,
    category: "pantalones",
    brand: "Adidas",
    sizes: ["M", "L", "XL"],
    colors: ["Negro", "Gris"],
    stock: 30,
    featured: true,
    image:
      "https://assets.adidas.com/images/w_600,f_auto,q_auto/3e3ce64f6e5c41e5826aad56010cfaeb_9366/Pantalon_de_Entrenamiento_Tiro_21_Negro_GN5723_01_laydown.jpg",
  },
  {
    name: "Zapatillas Puma Running",
    description:
      "Zapatillas de running con excelente amortiguación y soporte para largas distancias.",
    price: 89.99,
    category: "zapatos",
    brand: "Puma",
    sizes: ["38", "39", "40", "41", "42", "43"],
    colors: ["Negro", "Blanco", "Rojo"],
    stock: 25,
    featured: false,
    image:
      "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/376676/01/sv01/fnd/PNA/fmt/png/Zapatillas-de-running-PUMA-Flex-Essential",
  },
  {
    name: "Gorra Under Armour",
    description: "Gorra deportiva con protección UV y diseño transpirable.",
    price: 25.99,
    category: "accesorios",
    brand: "Under Armour",
    sizes: ["Única"],
    colors: ["Negro", "Azul", "Rojo"],
    stock: 40,
    featured: false,
    image:
      "https://underarmour.ec/cdn/shop/products/1361534-001_FC_Main_600x.png",
  },
  {
    name: "Shorts Nike Flex",
    description: "Shorts deportivos con tecnología Flex para máxima movilidad.",
    price: 35.99,
    category: "pantalones",
    brand: "Nike",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Negro", "Azul marino"],
    stock: 35,
    featured: true,
    image:
      "https://static.nike.com/a/images/t_default/7087002f-c053-482b-8f1f-e3a118b8fc7b/flex-stride-shorts-de-running-de-18-cm-con-forro-CfpWpd.png",
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb://admin:password123@localhost:27017/zonasport?authSource=admin"
    );

    // Limpiar productos existentes
    await Product.deleteMany({});

    // Insertar productos de ejemplo
    await Product.insertMany(sampleProducts);

    console.log("✅ Base de datos poblada exitosamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error poblando la base de datos:", error);
    process.exit(1);
  }
}

seedDatabase();
