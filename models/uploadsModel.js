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

// Obtener foto de perfil de usuario
const obtenerPerfilUsuario = (id_perfil, callback) => {
  const query = 'SELECT perfil FROM usuarios WHERE id_usuario = ?';
  db.query(query, [id_perfil], callback);
};

module.exports = {
  guardarArchivoNota,
  obtenerImagenNota,
  obtenerPerfilUsuario,
};