const Sequelize = require('sequelize');
const sequelize = new Sequelize('amazonassc_db', 'durottar', '060665cc', {
  host: 'localhost',
  dialect: 'postgres',
});

sequelize.sync()
  .then(() => {
    console.log('¡Sincronización exitosa!');
  })
  .catch((error) => {
    console.error('Error en la sincronización:', error);
  });

module.exports = sequelize;