const {
  getDisponibles,
  getByEspecialidad,
  getByProfesional,
  reservarTurno,
  cancelarTurno,
} = require('../models/turnosModel');

// GET /turnos/disponibles
const turnosDisponibles = (req, res) => {
  getDisponibles((err, turnos) => {
    if (err) {
      console.error('Error al obtener turnos disponibles:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.status(200).json(turnos);
  });
};

// GET /turnos/disponibles/especialidad/:especialidad
const turnosPorEspecialidad = (req, res) => {
  const { especialidad } = req.params;
  getByEspecialidad(especialidad, (err, turnos) => {
    if (err) {
      console.error('Error al obtener turnos por especialidad:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.status(200).json(turnos);
  });
};

// GET /turnos/disponibles/profesional/:profesional_id
const turnosPorProfesional = (req, res) => {
  const { profesional_id } = req.params;
  getByProfesional(profesional_id, (err, turnos) => {
    if (err) {
      console.error('Error al obtener turnos por profesional:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.status(200).json(turnos);
  });
};

// POST /turnos/:id/reservar
const reservar = (req, res) => {
  const { id } = req.params;
  const { usuario_id } = req.body;

  reservarTurno(id, usuario_id, (err, resultado) => {
    if (err) {
      console.error('Error al reservar el turno:', err);
      return res.status(500).json({ mensaje: 'Error interno al reservar el turno' });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'El turno no está disponible o no existe' });
    }
    res.status(200).json({ mensaje: 'Turno reservado con éxito' });
  });
};

// DELETE /turnos/:id
const cancelar = (req, res) => {
  const { id } = req.params;

  cancelarTurno(id, (err, resultado) => {
    if (err) {
      console.error('Error al cancelar el turno:', err);
      return res.status(500).json({ mensaje: 'Error interno al cancelar el turno' });
    }
    if (resultado.affectedRows === 0) {
      return res.status(404).json({ mensaje: 'El turno no existe o ya fue cancelado' });
    }
    res.status(200).json({ mensaje: 'Turno cancelado con éxito' });
  });
};

module.exports = {
  turnosDisponibles,
  turnosPorEspecialidad,
  turnosPorProfesional,
  reservar,
  cancelar,
};