const db = require('../config/db');

// Función para obtener un usuario por email y contraseña (sin encriptación)
const obtenerUsuarioLogeo = ([email, contrasena], callback) => {
  console.log('Buscando usuario con email:', email, 'y contraseña:', contrasena); // Depuración
  const query = 'SELECT * FROM usuarios WHERE email = ? AND contrasena = ?';

  db.query(query, [email, contrasena], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error); // Depuración
      return callback(error);
    }

    console.log('Resultado de la consulta:', results); // Depuración

    if (results.length === 0) {
      console.log('Usuario no encontrado'); // Depuración
      return callback(null, false);
    }

    console.log('Logeo exitoso, usuario encontrado:', results[0]); // Depuración
    callback(null, results[0]);
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
const registrarUsuario = (
  [nombre, apellido, email, contrasena, nombre_obra],
  callback
) => {
  const queryUsuario = `
    INSERT INTO usuarios (nombre, apellido, email, contrasena)
    VALUES (?, ?, ?, ?)
  `;
  const paramsUsuario = [nombre, apellido, email, contrasena];

  db.query(queryUsuario, paramsUsuario, (err, resultUsuario) => {
    if (err) return callback(err);

    const id_usuario = resultUsuario.insertId;

    const queryAfiliado = `
      INSERT INTO afiliado (id_usuario, nombre_obra)
      VALUES (?, ?)
    `;
    const paramsAfiliado = [id_usuario, nombre_obra];

    db.query(queryAfiliado, paramsAfiliado, (err2, resultAfiliado) => {
      if (err2) return callback(err2);

      callback(null, {
        usuario: {
          id_usuario,
          nombre,
          apellido,
          email
        },
        afiliado: {
          id_credencial: resultAfiliado.insertId,
          nombre_obra
        }
      });
    });
  });
};

// Función para obtener los datos de afiliado por id_usuario
const obtenerDatosAfiliado = (id_usuario, callback) => {
  const query = `
    SELECT id_credencial, nombre_obra
    FROM afiliado
    WHERE id_usuario = ?
  `;

  db.query(query, [id_usuario], (err, results) => {
    if (err) {
      console.error('Error SQL obtenerDatosAfiliado:', err); // <-- Agrega esto
      return callback(err);
    }
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

// Guardar el token de reseteo en la base de datos
const guardarResetToken = (email, token, callback) => {
  const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos desde ahora
  const query = 'UPDATE usuarios SET reset_token = ?, reset_token_expiry = ? WHERE email = ?';
  db.query(query, [token, expiry, email], callback);
};

// Buscar usuario por token de reseteo
const buscarUsuarioPorResetToken = (token, callback) => {
  const now = new Date();
  const query = 'SELECT * FROM usuarios WHERE reset_token = ? AND reset_token_expiry > ?';
  db.query(query, [token, now], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

// Cambiar la contraseña y limpiar el token
const cambiarContrasenaConToken = (token, nuevaContrasena, callback) => {
  const query = 'UPDATE usuarios SET contrasena = ?, reset_token = NULL WHERE reset_token = ?';
  db.query(query, [nuevaContrasena, token], callback);
};

module.exports = {
  obtenerUsuarioLogeo,
  buscarUsuarioPorEmail,
  registrarUsuario,
  obtenerDatosAfiliado,
  guardarResetToken,
  buscarUsuarioPorResetToken,
  cambiarContrasenaConToken,
};
