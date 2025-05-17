const getDisponibles = (callback) => {
  const query = `
    SELECT id_turno, fecha, hora, estado, profesional_id, especialidad
    FROM turnos
    WHERE estado = 'disponible'
  `;

  db.query(query, (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const getByEspecialidad = (especialidad, callback) => {
  const query = `
    SELECT id_turno, fecha, hora, estado, profesional_id, especialidad
    FROM turnos
    WHERE estado = 'disponible' AND especialidad = ?
  `;

  db.query(query, [especialidad], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};

const getByProfesional = (profesional_id, callback) => {
  const query = `
    SELECT id_turno, fecha, hora, estado, profesional_id, especialidad
    FROM turnos
    WHERE estado = 'disponible' AND profesional_id = ?
  `;

  db.query(query, [profesional_id], (err, resultados) => {
    if (err) return callback(err);
    callback(null, resultados);
  });
};





const reservarTurno = (turno_id, usuario_id, callback) => {
  const query = `
    UPDATE turnos
    SET usuario_id = ?, estado = 'reservado'
    WHERE id_turno = ? AND estado = 'disponible'
  `;

  db.query(query, [usuario_id, turno_id], (err, resultado) => {
    if (err) return callback(err);
    callback(null, resultado);
  });
};

const cancelarTurno = (turno_id, callback) => {
  const query = `
    UPDATE turnos
    SET usuario_id = NULL, estado = 'disponible'
    WHERE id_turno = ? AND estado = 'reservado'
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