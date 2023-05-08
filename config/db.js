const Sequelize = require('sequelize');
const sequelize = new Sequelize('amazonassc_db', 'durottar', '060665cc', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
