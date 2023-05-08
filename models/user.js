const { DataTypes } = require('sequelize');
const db = require('../config/db');

const User = db.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nombre_usuario: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true
    },
    contraseña: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    direccion_envio: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    ciudad: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    estado: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    codigo_postal: {
      type: DataTypes.STRING(10),
      allowNull: false,
      defaultValue: ''
    },
    pais: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: ''
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: new Date()
    }
});

module.exports = User;
