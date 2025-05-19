const db = require('../config/db');

// Turnos realizados
const obtenerTurnosRealizados = (id_usuario, callback) => {
  const query = `
    SELECT *
    FROM turnos
    WHERE id_usuario = ?
      AND disponibilidad = 'realizado'
    ORDER BY fecha DESC, hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

// Turnos cancelados
const obtenerTurnosCancelados = (id_usuario, callback) => {
  const query = `
    SELECT *
    FROM turnos
    WHERE id_usuario = ?
      AND disponibilidad = 'cancelado'
    ORDER BY fecha DESC, hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

// Turnos programados
const obtenerTurnosProgramados = (id_usuario, callback) => {
  const query = `
    SELECT *
    FROM turnos
    WHERE id_usuario = ?
      AND disponibilidad = 'reservado'
    ORDER BY fecha ASC, hora ASC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

// Notas médicas del usuario
const obtenerNotasMedicas = (id_usuario, callback) => {
  const query = `
    SELECT n.id_nota_medica, n.id_turno, n.fecha, n.nota, p.nombre_profesional AS profesional
    FROM notas_medicas n
    JOIN turnos t ON n.id_turno = t.id_turno
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    WHERE t.id_usuario = ?
    ORDER BY n.fecha DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

module.exports = {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
  obtenerNotasMedicas,
};