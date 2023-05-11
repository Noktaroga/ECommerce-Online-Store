/*const Sequelize = require('sequelize');
const sequelize = new Sequelize('amazonassc_db', 'durottar', '060665cc', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;*/


//Heroku
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  protocol: 'postgres',
  dialectOptions: {
    ssl: true
  }
});

module.exports = sequelize;
