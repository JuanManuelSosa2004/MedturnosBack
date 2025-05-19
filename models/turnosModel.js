const db = require('../config/db');

const getDisponibles = (callback) => {
  const query = `
    SELECT id_turno, fecha, hora, disponibilidad, id_profesional, id_usuario, id_especialidad
    FROM turnos
    WHERE disponibilidad = 'disponible'
  `;
  db.query(query, (err, resultados) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return callback(err);
    }
    callback(null, resultados);
  });
};

const getByEspecialidad = (id_especialidad, callback) => {
  const query = `
    SELECT id_turno, fecha, hora, disponibilidad, id_profesional, id_usuario, id_especialidad
    FROM turnos
    WHERE disponibilidad = 'disponible' AND id_especialidad = ?
  `;
  db.query(query, [id_especialidad], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const getByProfesional = (id_profesional, callback) => {
  const query = `
    SELECT id_turno, fecha, hora, disponibilidad, id_profesional, id_usuario, id_especialidad
    FROM turnos
    WHERE disponibilidad = 'disponible' AND id_profesional = ?
  `;
  db.query(query, [id_profesional], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const reservarTurno = (turno_id, usuario_id, callback) => {
  const query = `
    UPDATE turnos
    SET id_usuario = ?, disponibilidad = 'reservado'
    WHERE id_turno = ? AND disponibilidad = 'disponible'
  `;
  db.query(query, [usuario_id, turno_id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const cancelarTurno = (turno_id, callback) => {
  const query = `
    UPDATE turnos
    SET id_usuario = NULL, disponibilidad = 'disponible'
    WHERE id_turno = ? AND disponibilidad = 'reservado'
  `;
  db.query(query, [turno_id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

module.exports = {
  getDisponibles,
  getByEspecialidad,
  getByProfesional,
  reservarTurno,
  cancelarTurno,
};