const express = require('express');
const app = express();
const appRoutes = require('./app');
const sequelize = require('./config/db');

app.use('/', appRoutes);

const PORT = process.env.PORT || 3000;

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    return sequelize.sync(); // aquí se sincronizan los modelos con la base de datos
  })
  .then(() => {
    console.log('All models were synchronized successfully.');
    app.listen(PORT, () => {
      console.log(`App listening at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
    process.exit(1); // salir de la aplicación si no se puede conectar a la base de datos
  });

process.on('unhandledRejection', (err) => {
  console.error('Unhandled rejection:', err);
  process.exit(1); // salir de la aplicación si hay un rechazo no manejado
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  process.exit(1); // salir de la aplicación si hay una excepción no manejada
});
