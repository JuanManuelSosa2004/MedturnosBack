const db = require('../config/db');
const fs = require('fs');

// Guardar archivo en notasmedicas
const guardarArchivoNota = (id_turno, contenido, filePath, callback) => {
  try {
    const archivo = fs.readFileSync(filePath);
    const query = `
      INSERT INTO notasmedicas (id_turno, contenido, imagenes)
      VALUES (?, ?, ?)
    `;
    db.query(query, [id_turno, contenido, archivo], callback);
  } catch (error) {
    callback(error);
  }
};

// Obtener imagen de nota médica
const obtenerImagenNota = (id_nota, callback) => {
  const query = 'SELECT imagenes FROM notasmedicas WHERE id_nota = ?';
  db.query(query, [id_nota], callback);
};

// Actualmente sin uso (Mantenido por si se necesita en el futuro)
const obtenerPerfilUsuario = (id_perfil, callback) => {
  const query = 'SELECT perfil FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_perfil], callback);
};

// Actualizar foto de perfil de usuario
const actualizarFotoPerfil = (id_usuario, filePath, callback) => {
  try {
    const imagen = fs.readFileSync(filePath);
    const query = 'UPDATE usuarios SET perfil = ? WHERE id_usuario = ?';
    db.query(query, [imagen, id_usuario], callback);
  } catch (error) {
    callback(error);
  }
};

module.exports = {
  guardarArchivoNota,
  obtenerImagenNota,
  obtenerPerfilUsuario,
  actualizarFotoPerfil,
};