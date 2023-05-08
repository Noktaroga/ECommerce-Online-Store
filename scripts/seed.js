const db = require('../config/db');
const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

// Asegurarse de que la tabla de órdenes se haya creado antes de ejecutar las operaciones de inserción de datos
async function syncDatabase() {
  await db.sync({force: true});
}

// Crear algunos registros de prueba en la tabla de órdenes
async function createTestOrders() {
  await Order.create({
    id_usuario: 1,
    fecha_pedido: new Date(),
    total: 20.00,
    direccion_envio: 'Calle Falsa 123',
    estado_pedido: 'Enviado',
    fecha_actualizacion: new Date(),
    id_carrito: 1
  });

  await Order.create({
    id_usuario: 2,
    fecha_pedido: new Date(),
    total: 50.00,
    direccion_envio: 'Calle Falsa 456',
    estado_pedido: 'Entregado',
    fecha_actualizacion: new Date(),
    id_carrito: 2
  });

  await Order.create({
    id_usuario: 3,
    fecha_pedido: new Date(),
    total: 75.00,
    direccion_envio: 'Calle Falsa 789',
    estado_pedido: 'Cancelado',
    fecha_actualizacion: new Date(),
    id_carrito: 3
  });
}

// Crear algunos registros de prueba en la tabla de Product.
async function createTestProducts() { 
  await Product.create({
    nombre_producto: 'Producto 1',
    descripcion: 'Descripción del producto 1',
    categoria: 'Categoría 1',
    precio: 10.00,
    enlace_afiliado: 'https://www.amazon.com/producto-1',
    imagen: 'https://www.amazon.com/producto-1.jpg'
  });

  await Product.create({
    nombre_producto: 'Producto 2',
    descripcion: 'Descripción del producto 2',
    categoria: 'Categoría 2',
    precio: 25.00,
    enlace_afiliado: 'https://www.amazon.com/producto-2',
    imagen: 'https://www.amazon.com/producto-2.jpg'
  });

  await Product.create({
    nombre_producto: 'Producto 3',
    descripcion: 'Descripción del producto 3',
    categoria: 'Categoría 3',
    precio: 50.00,
    enlace_afiliado: 'https://www.amazon.com/producto-3',
    imagen: 'https://www.amazon.com/producto-3.jpg'
  });
}

// Crear algunos registros de prueba en la tabla de Users.
async function createTestUsers() {
  await User.create({
    nombre_usuario: 'Juancg',
    email: 'juanperez@example.com',
    contraseña: 'contrasena1',
    pais: 'VENEZUELA'
  });

  await User.create({
    nombre_usuario: 'Mariacg',
    email: 'mariagonzalez@example.com',
    contraseña: 'contrasena2',
    pais: 'ARGENTINA'
  });

  await User.create({
    nombre_usuario: 'Carloscg',
    email: 'carlossanchez@example.com',
    contraseña: 'contrasena3',
    pais: 'CHILE'
  });
}

syncDatabase()
  .then(async () => {
    await createTestOrders();
    await createTestProducts();
    await createTestUsers();

    console.log('Test orders, products created successfully.');
  })
  .catch(error => {
    console.error('Error syncing database:', error);
  });
