const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre_producto: {
    type: Sequelize.STRING,
    allowNull: false
  },
  descripcion: {
    type: Sequelize.STRING,
    allowNull: false
  },
  categoria: {
    type: Sequelize.STRING,
    allowNull: true
  },
  precio: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  enlace_afiliado: {
    type: Sequelize.STRING,
    allowNull: true
  },
  imagen: {
    type: Sequelize.STRING,
    allowNull: true
  },
  atributo_extra_1: {
    type: Sequelize.STRING,
    allowNull: true
  },
  atributo_extra_2: {
    type: Sequelize.STRING,
    allowNull: true
  }
});


module.exports = Product;
