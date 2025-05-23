const mysql = require('mysql2');

// Usar variables de entorno para la conexión
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // Puedes ajustar este número según tus necesidades
  queueLimit: 0
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
module.exports = pool;