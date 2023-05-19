const Order = require('./order');
const User = require('./user');
const Product = require('./product');

// Asociaciones
Order.belongsTo(User, { foreignKey: 'userId' });  // Una orden pertenece a un usuario
User.hasMany(Order, { foreignKey: 'userId', as:'User'});     // Un usuario tiene muchas órdenes

Order.belongsToMany(Product, { through: 'OrderItem', as: 'products'});  // Una orden puede tener muchos productos a través de la tabla intermedia 'OrderItem'
Product.belongsToMany(Order, { through: 'OrderItem' ,as: 'order'});  // Un producto puede estar en muchas órdenes a través de la tabla intermedia 'OrderItem'


/*process.on('warning', (warning) => {
    console.warn(warning.stack);
  });
  
const defineAssociations = function(models) {
    const { User, Order, Product } = models;
  
    try {
      if (User && Order && Product) {
        // El objeto `models` contiene las propiedades `User`, `Order` y `Product`
        User.hasMany(Order, { foreignKey: 'userId', as: 'orders' });
        User.hasMany(Product, { foreignKey: 'userId' });
        Order.belongsTo(User, { foreignKey: 'userId' });
        Order.belongsToMany(Product, { through: 'order_products', as: 'products' });
        Product.belongsToMany(Order, { through: 'order_products' });
      } else {
        // El objeto `models` no contiene alguna o todas las propiedades necesarias
        throw new Error('El objeto `models` no contiene las propiedades necesarias.');
        // O puedes manejar el error de otra forma, como mostrar un mensaje de error o realizar alguna acción adicional
      }
    } catch (error) {
      // Maneja el error como desees
      console.error('Error en la verificación de las propiedades:', error.message);
    }
  };
  
  module.exports = { defineAssociations };
  */