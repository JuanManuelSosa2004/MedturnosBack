const db = require('../config/db');

// 1. Obtener todos los médicos
const obtenerTodosLosMedicos = (callback) => {
  const query = `
    SELECT id_profesional, nombre_profesional, email, ubicacion, id_especialidad
    FROM profesionales
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

// 2. Obtener un médico por ID
const obtenerMedicoPorId = (id, callback) => {
  const query = `
    SELECT id_profesional, nombre_profesional, email, ubicacion, id_especialidad
    FROM profesionales
    WHERE id_profesional = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);
    callback(null, results[0]);
  });
};

// 3. Obtener médicos por nombre exacto de especialidad
const obtenerMedicosPorEspecialidad = (especialidad, callback) => {
  const query = `
    SELECT p.id_profesional, p.nombre_profesional, p.email, p.ubicacion, e.nombre AS especialidad
    FROM profesionales p
    JOIN especialidades e ON p.id_especialidad = e.id_especialidad
    WHERE e.nombre = ?
  `;
  db.query(query, [especialidad], (err, results) => {
    if (err) return callback(err);
    callback(null, results);
  });
};

module.exports = {
  obtenerTodosLosMedicos,
  obtenerMedicoPorId,
  obtenerMedicosPorEspecialidad
};
