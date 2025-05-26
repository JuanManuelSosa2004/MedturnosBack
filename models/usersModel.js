const db = require('../config/db');


 

const obtenerDatosAfiliado = (id_usuario, callback) => {
  const query = `
    SELECT 
      id_credencial,
      nombre_obra 
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
  const queryAfiliado = 'DELETE FROM afiliado WHERE id_usuario = ?';
  db.query(queryAfiliado, [id_usuario], (err) => {
    if (err) return callback(err);

    // Luego eliminar al usuario de la tabla usuarios
    const queryUsuario = 'DELETE FROM usuarios WHERE id_usuario = ?';
    db.query(queryUsuario, [id_usuario], (err, result) => {
      if (err) return callback(err);
      callback(null, result);
    });
  });
};

const updateUser = (userId, userData, callback) => {
  const campos = [];
  const valores = [];

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

  if (campos.length > 0) {
    const query = `UPDATE usuarios SET ${campos.join(', ')} WHERE id_usuario = ?`;
    valores.push(userId);

    db.query(query, valores, (error, results) => {
      if (error) return callback(error);

      if (userData.nombre_obra !== undefined) {
        const queryAfiliado = `UPDATE afiliado SET nombre_obra = ? WHERE id_usuario = ?`;
        db.query(queryAfiliado, [userData.nombre_obra, userId], (error2, results2) => {
          if (error2) return callback(error2);
          callback(null, { usuario: results, afiliado: results2 });
        });
      } else {
        callback(null, { usuario: results });
      }
    });
  } else if (userData.nombre_obra !== undefined) {
    const queryAfiliado = `UPDATE afiliado SET nombre_obra = ? WHERE id_usuario = ?`;
    db.query(queryAfiliado, [userData.nombre_obra, userId], (error2, results2) => {
      if (error2) return callback(error2);
      callback(null, { afiliado: results2 });
    });
  } else {
    return callback(new Error('No se enviaron campos para actualizar'));
  }
};

module.exports = {
  obtenerDatosAfiliado,
  obtenerPerfil,
  eliminarCuenta,
  updateUser,
};
