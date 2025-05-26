const db = require('../config/db');

const obtenerTurnosRealizados = (id_usuario, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.disponibilidad,
      t.fecha,
      t.hora,
      p.nombre_profesional,
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'realizado'
    ORDER BY t.fecha DESC, t.hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);

    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: (() => {
        try {
          return JSON.parse(turno.diasTrabajo || '[]');
        } catch (error) {
          console.error('Error al parsear diasTrabajo:', error);
          return [];
        }
      })(),
    }));

    callback(null, turnos);
  });
};

const obtenerTurnosCancelados = (id_usuario, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.disponibilidad,
      t.fecha,
      t.hora,
      p.nombre_profesional,
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'cancelado'
    ORDER BY t.fecha DESC, t.hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);

    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: (() => {
        try {
          return JSON.parse(turno.diasTrabajo || '[]');
        } catch (error) {
          console.error('Error al parsear diasTrabajo:', error);
          return [];
        }
      })(),
    }));

    callback(null, turnos);
  });
};

module.exports = {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
};