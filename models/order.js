const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Order = db.define('order', {
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_pedido: {
    type: DataTypes.DATE,
    allowNull: false
  },
  total: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  direccion_envio: {
    type: DataTypes.STRING,
    allowNull: false
  },
  estado_pedido: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    allowNull: false
  },
  id_carrito: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

module.exports = Order;
