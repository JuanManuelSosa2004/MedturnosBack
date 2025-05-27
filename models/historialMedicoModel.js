const db = require('../config/db');

const obtenerTurnosRealizados = (id_usuario, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.disponibilidad,
      t.fecha,
      t.hora,
      p.nombre_profesional,
      p.email, -- Agregado el email del médico
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
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim()) // Convertir string separado por comas a array
        : [], // Si es NULL, devolver un array vacío
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
      p.email, -- Agregado el email del médico
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
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim()) // Convertir string separado por comas a array
        : [], // Si es NULL, devolver un array vacío
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
      p.email, -- Agregado el email del médico
      p.ubicacion,
      p.diasTrabajo,
      e.descripcion AS especialidad
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE t.id_usuario = ?
      AND t.disponibilidad = 'reservado'
    ORDER BY t.fecha ASC, t.hora ASC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);

    const turnos = resultados.map((turno) => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map((dia) => dia.trim()) // Convertir string separado por comas a array
        : [], // Si es NULL, devolver un array vacío
    }));

    callback(null, turnos);
  });
};

module.exports = {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
};