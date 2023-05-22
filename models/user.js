//process.on('warning', (warning) => {
//  console.warn(warning.stack);
//});

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcrypt');
//const Product = require('./product');
//const Order = require('./order');

const Sequelize = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  nombre: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  contraseña: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rol: {
    type: Sequelize.STRING,
    allowNull: true
  },

});

console.log('Verificación de asociaciones exitosa en user.js');

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.contraseña, 10);
  user.contraseña = hashedPassword;
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.contraseña);
};

module.exports = User

