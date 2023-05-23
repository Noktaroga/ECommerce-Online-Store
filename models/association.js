const Cart = require('./cart');
const User = require('./user');
const Product = require('./product');

// Asociaciones
Cart.belongsTo(User, { foreignKey: 'userId' }); // Un carrito pertenece a un usuario
User.hasOne(Cart, { foreignKey: 'userId', as: 'cart' }); // Un usuario tiene un carrito

Cart.belongsToMany(Product, { through: 'CartProduct', as: 'products' }); // Un carrito puede tener muchos productos a través de la tabla intermedia 'CartProduct'
Product.belongsToMany(Cart, { through: 'CartProduct', as: 'carts' }); // Un producto puede estar en muchos carritos a través de la tabla intermedia 'CartProduct'
