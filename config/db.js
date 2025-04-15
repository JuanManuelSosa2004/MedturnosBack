const mysql = require('mysql2');

// Crear conexión con los datos directamente
const connection = mysql.createConnection({
  uri: 'mysql://root:FXgjiWhEHTkNBdzcBUVCfGxHeCZcQGGi@switchback.proxy.rlwy.net:12826/railway',
});

// Conectar a la base de datos
connection.connect(err => {
  if (err) {
    console.error('Error conectando a la base de datos: ', err);
    return;
  }
  console.log('Conexión exitosa a la base de datos MySQL');
});

// Exportar la conexión
module.exports = connection;
