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
      p.diasTrabajo, -- Agregado
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
      diasTrabajo: JSON.parse(turno.diasTrabajo || '[]'),
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
      p.diasTrabajo, -- Agregado
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
      diasTrabajo: JSON.parse(turno.diasTrabajo || '[]'),
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
      p.ubicacion,
      p.diasTrabajo, -- Agregado
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
      diasTrabajo: JSON.parse(turno.diasTrabajo || '[]'),
    }));

    callback(null, turnos);
  });
};

const obtenerNotasMedicas = (id_usuario, callback) => {
  const query = `
    SELECT n.id_nota, n.id_turno, n.contenido, n.imagenes, t.fecha, p.nombre_profesional AS profesional, p.diasTrabajo -- Agregado
    FROM notasmedicas n
    JOIN turnos t ON n.id_turno = t.id_turno
    JOIN profesionales p ON t.id_profesional = p.id_profesional
    WHERE t.id_usuario = ?
    ORDER BY t.fecha DESC
  `;
  db.query(query, [id_usuario], (err, resultados) => {
    if (err) return callback(err);

    const notas = resultados.map((nota) => ({
      ...nota,
      diasTrabajo: JSON.parse(nota.diasTrabajo || '[]'),
    }));

    callback(null, notas);
  });
};

module.exports = {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
  obtenerNotasMedicas,
};