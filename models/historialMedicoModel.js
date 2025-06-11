const db = require('../config/db');

const obtenerTurnosRealizados = (id_usuario, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.disponibilidad,
      t.fecha,
      t.hora,
      p.nombre_profesional,
      p.email,
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'completed'
    ORDER BY t.fecha DESC, t.hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim())
        : [],
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
      p.email,
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'Cancelled'
    ORDER BY t.fecha DESC, t.hora DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim())
        : [],
    }));
    callback(null, turnos);
  });
};

const obtenerTurnosProgramados = (id_usuario, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.disponibilidad,
      t.fecha,
      t.hora,
      p.nombre_profesional,
      p.email,
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'scheduled'
    ORDER BY t.fecha ASC, t.hora ASC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);
    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim())
        : [],
    }));
    callback(null, turnos);
  });
};

const obtenerNotaMedicaPorTurno = (id_turno, callback) => {
  const query = `
    SELECT 
      n.contenido
    FROM notasmedicas n
    WHERE n.id_turno = ?
  `;
  db.query(query, [id_turno], (err, resultados) => {
    if (err) return callback(err);
    if (resultados.length === 0) return callback(null, null);
    callback(null, resultados[0]);
  });
};

module.exports = {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
  obtenerNotaMedicaPorTurno,
};