const db = require('../config/db');

const obtenerUsuarioLogeo = ([email, contrasena], callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
  db.query(query, [email, contrasena], (error, results) => {
    if (error) return callback(error);

    if (results.length === 0) {
      return callback(null, false);
    }

    console.log('Logeo exitoso, usuario encontrado', results[0]);
    callback(null, results[0]);
  });
};

const buscarUsuarioPorEmail = (email, callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    if (results.length > 0) return callback(null, results[0]);
    return callback(null, null);
  });
};

const registrarUsuario = ([nombre, apellido, email, contrasena], callback) => {
  const query = `
    INSERT INTO usuarios (nombre, apellido, email, contrasena)
    VALUES (?, ?, ?, ?)
  `;
  const params = [nombre, apellido, email, contrasena];
  
  db.query(query, params, (error, results) => {
    if (error) return callback(error);
    callback(null, results);
  });
};

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

const editarPerfil = (id_usuario, { nombre, apellido, email }, callback) => {
  const query = `
      UPDATE usuarios
      SET nombre = ?, apellido = ?, email = ?
      WHERE id_usuario = ?
    `;
  const params = [nombre, apellido, email, id_usuario];

  db.query(query, params, (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

const eliminarCuenta = (id_usuario, callback) => {
  const query = 'DELETE FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_usuario], (err, result) => {
    if (err) return callback(err);
    callback(null, result);
  });
};

module.exports = {
  obtenerUsuarioLogeo,
  buscarUsuarioPorEmail,
  registrarUsuario,
  obtenerDatosAfiliado,
  obtenerPerfil,
  editarPerfil,
  eliminarCuenta,
};
