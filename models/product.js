const { DataTypes } = require('sequelize');
const db = require('../config/db');

const Product = db.define('product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre_producto: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  categoria: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false
  },
  enlace_afiliado: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  atributo_extra_1: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  atributo_extra_2: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
});

module.exports = Product;


