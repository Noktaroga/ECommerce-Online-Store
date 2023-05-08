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
    allowNull: false,
    defaultValue: ''
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: ''
  },
  categoria: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  enlace_afiliado: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
    
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: ''
  },
  atributo_extra_1: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  atributo_extra_2: {
    type: DataTypes.STRING(255),
    allowNull: true
  }
});

module.exports = Product;


