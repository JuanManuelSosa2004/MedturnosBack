const db = require('../config/db');

const obtenerTodosLosMedicos = (callback) => {
  const query = `
    SELECT id_profesional, nombre_profesional, email, ubicacion, id_especialidad, diasTrabajo
    FROM profesionales
  `;
  db.query(query, (err, results) => {
    if (err) return callback(err);

    const medicos = results.map((medico) => ({
      ...medico,
      diasTrabajo: (() => {
        try {
          return JSON.parse(medico.diasTrabajo || '[]');
        } catch (error) {
          console.error('Error al parsear diasTrabajo:', error);
          return [];
        }
      })(),
    }));

    callback(null, medicos);
  });
};

const obtenerMedicoPorId = (id, callback) => {
  const query = `
    SELECT id_profesional, nombre_profesional, email, ubicacion, id_especialidad, diasTrabajo
    FROM profesionales
    WHERE id_profesional = ?
  `;
  db.query(query, [id], (err, results) => {
    if (err) return callback(err);
    if (results.length === 0) return callback(null, null);

    const medico = {
      ...results[0],
      diasTrabajo: (() => {
        try {
          return JSON.parse(results[0].diasTrabajo || '[]');
        } catch (error) {
          console.error('Error al parsear diasTrabajo:', error);
          return [];
        }
      })(),
    };

    callback(null, medico);
  });
};

const obtenerMedicosPorEspecialidad = (especialidad, callback) => {
  const query = `
    SELECT p.id_profesional, p.nombre_profesional, p.email, p.ubicacion, e.descripcion AS especialidad, p.diasTrabajo
    FROM profesionales p
    JOIN especialidad e ON p.id_especialidad = e.id_especialidad
    WHERE e.descripcion = ?
  `;
  db.query(query, [especialidad], (err, results) => {
    if (err) return callback(err);

    const medicos = results.map((medico) => ({
      ...medico,
      diasTrabajo: (() => {
        try {
          return JSON.parse(medico.diasTrabajo || '[]');
        } catch (error) {
          console.error('Error al parsear diasTrabajo:', error);
          return [];
        }
      })(),
    }));

    callback(null, medicos);
  });
};

module.exports = {
  obtenerTodosLosMedicos,
  obtenerMedicoPorId,
  obtenerMedicosPorEspecialidad,
};
