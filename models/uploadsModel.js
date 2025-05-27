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
const obtenerImagenNota = (id_turno, callback) => {
  const query = 'SELECT imagenes FROM notasmedicas WHERE id_nota = ?';
  db.query(query, [id_turno], callback);
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

// Actualizar foto de profesional
const actualizarFotoProfesional = (id_profesional, filePath, callback) => {
  try {
    const imagen = fs.readFileSync(filePath); // Leer el archivo como binario
    const query = 'UPDATE profesionales SET imagen = ? WHERE id_profesional = ?';
    db.query(query, [imagen, id_profesional], callback);
  } catch (error) {
    callback(error);
  }
};

// Obtener foto de un profesional
const obtenerFotoProfesional = (id_profesional, callback) => {
  const query = 'SELECT imagen FROM profesionales WHERE id_profesional = ?';
  db.query(query, [id_profesional], callback);
};

module.exports = {
  guardarArchivoNota,
  obtenerImagenNota,
  obtenerPerfilUsuario,
  actualizarFotoPerfil,
  actualizarFotoProfesional,
  obtenerFotoProfesional, // Nueva función exportada
};