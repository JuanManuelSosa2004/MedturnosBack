const db = require('../config/db');

// Función para obtener un usuario por email y contraseña (sin encriptación)
const obtenerUsuarioLogeo = ([email, contrasena], callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';
  
  db.query(query, [email, contrasena], (error, results) => {
    if (error) return callback(error);

    if (results.length === 0) {
      return callback(null, false); // No se encontró el usuario
    }

    console.log('Logeo exitoso, usuario encontrado', results[0]);
    callback(null, results[0]); // Usuario encontrado
  });
};

// Función para buscar un usuario por email
const buscarUsuarioPorEmail = (email, callback) => {
  const query = 'SELECT * FROM usuarios WHERE email = ?';
  
  db.query(query, [email], (err, results) => {
    if (err) return callback(err);
    
    if (results.length > 0) {
      return callback(null, results[0]); // Usuario encontrado
    }
    
    return callback(null, null); // No existe el usuario con ese email
  });
};

// Función para registrar un nuevo usuario
const registrarUsuario = ([nombre, apellido, email, contrasena], callback) => {
  const query = `
    INSERT INTO usuarios (nombre, apellido, email, contrasena)
    VALUES (?, ?, ?, ?)
  `;
  const params = [nombre, apellido, email, contrasena];

  db.query(query, params, (error, results) => {
    if (error) return callback(error);
    callback(null, results); // Usuario registrado con éxito
  });
};

// Función para obtener los datos de afiliado por id_usuario
const obtenerDatosAfiliado = (id_usuario, callback) => {
  const query = `
    SELECT plan, precio, fecha_fin, id_obra
    FROM afiliado
    WHERE id_usuario = ?
  `;
  
  db.query(query, [id_usuario], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null); // No se encontró afiliado
    callback(null, results[0]); // Datos del afiliado encontrados
  });
};

module.exports = {
  obtenerUsuarioLogeo,
  buscarUsuarioPorEmail,
  registrarUsuario,
  obtenerDatosAfiliado,
};
