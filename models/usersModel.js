const db = require('../config/db');


 

const obtenerDatosAfiliado = (id_usuario, callback) => {
  const query = `
      SELECT plan, precio, fecha_fin, id_obra
      FROM afiliado
      WHERE id_usuario = ?
    `;
  db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

const obtenerPerfil = (id_usuario, callback) => {
  const query = 'SELECT nombre, apellido, email FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};


const eliminarCuenta = (id_usuario, callback) => {
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_usuario], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const updateUser = (userId, userData, callback) => {
  const campos = [];
  const valores = [];

  // Agregar los campos enviados al array de campos y valores
  if (userData.nombre !== undefined) {
    campos.push('nombre = ?');
    valores.push(userData.nombre);
  }
  if (userData.apellido !== undefined) {
    campos.push('apellido = ?');
    valores.push(userData.apellido);
  }
  if (userData.email !== undefined) {
    campos.push('email = ?');
    valores.push(userData.email);
  }
  if (userData.contrasena !== undefined) {
    campos.push('contrasena = ?');
    valores.push(userData.contrasena);
  }

  // Si no se envió ningún campo, devolver un error
  if (campos.length === 0) {
    return callback(new Error('No se enviaron campos para actualizar'));
  }

  // Construir la consulta SQL
  const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ?`;
  valores.push(userId); // Agregar el ID del usuario al final de los valores

  // Ejecutar la consulta
  db.query(query, valores, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

module.exports = {
  obtenerDatosAfiliado,
  obtenerPerfil,
  eliminarCuenta,
  updateUser,
};
