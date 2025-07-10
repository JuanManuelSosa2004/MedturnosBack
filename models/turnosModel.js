const db = require('../config/db');

const getDisponibles = callback => {
  const query = `
    SELECT 
      t.id_turno,
      t.fecha,
      t.hora,
      t.disponibilidad,
      t.id_profesional,
      t.id_usuario,
      t.id_especialidad,
      p.nombre_profesional AS nombre,
      e.descripcion AS especialidad,
      p.ubicacion AS hospital,
      p.diasTrabajo
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON t.id_especialidad = e.id_especialidad
    WHERE t.disponibilidad = 'disponible'
  `;
  db.query(query, (err, resultados) => {
    if (err) {
      console.error('Error en la consulta SQL:', err);
      return callback(err);
    }

    const turnos = resultados.map(turno => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map(dia => dia.trim())
        : [],
    }));

    callback(null, turnos);
  });
};

const getByEspecialidad = (id_especialidad, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.fecha,
      t.hora,
      t.disponibilidad,
      t.id_profesional,
      t.id_usuario,
      t.id_especialidad,
      p.nombre_profesional AS nombre,
      e.descripcion AS especialidad,
      p.ubicacion AS hospital,
      p.diasTrabajo
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON t.id_especialidad = e.id_especialidad
    WHERE t.disponibilidad = 'available' AND t.id_especialidad = ?
  `;
  db.query(query, [id_especialidad], (err, resultados) => {
    if (err) return callback(err);

    const turnos = resultados.map(turno => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map(dia => dia.trim())
        : [],
    }));

    callback(null, turnos);
  });
};

const getByProfesional = (id_profesional, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.fecha,
      t.hora,
      t.disponibilidad,
      t.id_profesional,
      t.id_usuario,
      t.id_especialidad,
      p.nombre_profesional AS nombre,
      p.ubicacion AS hospital,
      p.diasTrabajo
    FROM turnos t
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    WHERE t.disponibilidad = 'available' AND t.id_profesional = ?
    ORDER BY t.fecha ASC, t.hora ASC
  `;
  db.query(query, [id_profesional], (err, resultados) => {
    if (err) return callback(err);

    const turnos = resultados.map(turno => ({
      ...turno,
      diasTrabajo: turno.diasTrabajo
        ? turno.diasTrabajo.split(',').map(dia => dia.trim())
        : [],
    }));

    callback(null, turnos);
  });
};

const reservarTurno = (turno_id, id_usuario, callback) => {
  const query = `
    UPDATE turnos
    SET id_usuario = ?, disponibilidad = 'scheduled'
    WHERE id_turno = ? AND disponibilidad = 'available'
  `;
  db.query(query, [id_usuario, turno_id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const cancelarTurno = (turno_id, callback) => {
  const query = `
    UPDATE turnos
    SET disponibilidad = 'Cancelled'
    WHERE id_turno = ? AND disponibilidad = 'scheduled'
  `;
  db.query(query, [turno_id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const marcarTurnosRealizadosAutomaticamente = callback => {
  const query = `
    UPDATE turnos
    SET disponibilidad = 'completed'
    WHERE disponibilidad = 'scheduled'
      AND (
        fecha < CURDATE()
        OR (fecha = CURDATE() AND hora <= CURTIME())
      )
  `;
  db.query(query, (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const cancelarTurnosDisponiblesVencidos = callback => {
  const query = `
    UPDATE turnos
    SET disponibilidad = 'Cancelled'
    WHERE disponibilidad = 'available'
      AND (
        fecha < CURDATE()
        OR (fecha = CURDATE() AND hora <= CURTIME())
      )
  `;
  db.query(query, (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const getTurnosPorFecha = (fecha, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.hora
    FROM turnos t
    WHERE t.fecha = ? AND t.disponibilidad = 'available'
    ORDER BY t.hora ASC
  `;
  db.query(query, [fecha], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const getTurnosPorFechaYProfesional = (id_profesional, fecha, callback) => {
  const query = `
    SELECT 
      t.id_turno,
      t.hora
    FROM turnos t
    WHERE t.id_profesional = ? AND t.fecha = ? AND t.disponibilidad = 'available'
    ORDER BY t.hora ASC
  `;
  db.query(query, [id_profesional, fecha], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const getTurnosParaNotificar = callback => {
  const query = `
    SELECT 
      t.id_turno,
      t.fecha,
      t.hora,
      t.id_usuario,
      u.nombre,
      u.apellido,
      u.email,
      p.nombre_profesional,
      e.descripcion AS especialidad,
      p.ubicacion AS hospital
    FROM turnos t
    JOIN usuarios u ON t.id_usuario = u.id_usuario
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    JOIN especialidad e ON t.id_especialidad = e.id_especialidad
    WHERE t.disponibilidad = 'scheduled'
      AND (t.notificado IS NULL OR t.notificado = 0)
      AND TIMESTAMPDIFF(HOUR, NOW(), CONCAT(t.fecha, ' ', t.hora)) <= 24
      AND TIMESTAMPDIFF(HOUR, NOW(), CONCAT(t.fecha, ' ', t.hora)) > 0
  `;
  db.query(query, (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const marcarTurnoNotificado = (id_turno, callback) => {
  const query = `
    UPDATE turnos 
    SET notificado = 1 
    WHERE id_turno = ?
  `;
  db.query(query, [id_turno], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

module.exports = {
  getDisponibles,
  getByEspecialidad,
  getByProfesional,
  getTurnosPorFechaYProfesional,
  reservarTurno,
  cancelarTurno,
  marcarTurnosRealizadosAutomaticamente,
  cancelarTurnosDisponiblesVencidos,
  getTurnosPorFecha,
  getTurnosParaNotificar,
  marcarTurnoNotificado,
};
