const Sequelize = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user');
const Product = require('./product');

const Order = sequelize.define('order', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  cantidad: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  direccion_envio: {
    type: Sequelize.STRING,
    allowNull: false
  },
  estado: {
    type: Sequelize.ENUM('pendiente', 'enviado', 'entregado', 'cancelado'),
    defaultValue: 'pendiente'
  },
  fecha_creacion: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  fecha_actualizacion: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: User, // Nombre del modelo referenciado
      key: 'id'   // Nombre de la columna referenciada
    }
  },
  productId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: {
      model: Product,
      key: 'id'
    }
  }
});

console.log('Verificación de asociaciones exitosa en user.js');

Order.sync();


module.exports = Order;
