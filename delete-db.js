const { Pool, Client } = require('pg');

// Configura la conexión a la base de datos
const pool = new Pool({
  user: 'durottar',
  host: 'localhost',
  database: 'amazonassc_db',
  password: '060665cc',
  port: 5432,
});

// Cierra todas las conexiones activas del pool
pool.end((err) => {
  if (err) {
    console.error('Error al cerrar las conexiones de la base de datos', err.stack);
  } else {
    console.log('Todas las conexiones de la base de datos han sido cerradas exitosamente');
  }

  // Query para borrar la base de datos
  const deleteQuery = 'DROP DATABASE IF EXISTS amazonassc_db';

  // Crea una nueva conexión para ejecutar la query de borrado
  const client = new Client({
    user: 'durottar',
    host: 'localhost',
    database: 'postgres',
    password: '060665cc',
    port: 5432,
  });

  // Conecta con la base de datos
  client.connect()
    .then(() => {
      console.log('Conexión con la base de datos establecida exitosamente');
      // Ejecuta la query
      return client.query(deleteQuery);
    })
    .then(() => console.log('Base de datos eliminada exitosamente'))
    .catch((error) => console.error('Error al eliminar la base de datos', error))
    .finally(() => client.end());
});
