const {
  getDisponibles,
  getByEspecialidad,
  getByProfesional,
  reservarTurno,
  cancelarTurno,
  getTurnosPorFecha,
  getTurnosPorFechaYProfesional,
} = require('../models/turnosModel');


const turnosDisponibles = (req, res) => {
  getDisponibles((err, turnos) => {
    if (err) {
      console.error('Error al obtener turnos disponibles:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
    res.status(200).json(turnos);
  });
};

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


const obtenerTurnosPorFecha = (req, res) => {
  const { fecha } = req.params;

  if (!fecha) {
    return res.status(400).json({ mensaje: 'No se proporcionó la fecha' });
  }

  getTurnosPorFecha(fecha, (err, turnos) => {
    if (err) {
      console.error('Error al obtener los turnos por fecha:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    res.status(200).json(turnos);
  });
};

const obtenerTurnosPorFechaYProfesional = (req, res) => {
  const { profesional_id } = req.params;
  const { fecha } = req.query;

  if (!profesional_id || !fecha) {
    return res.status(400).json({ mensaje: 'No se proporcionaron todos los parámetros requeridos' });
  }

  getTurnosPorFechaYProfesional(profesional_id, fecha, (err, turnos) => {
    if (err) {
      console.error('Error al obtener los turnos por fecha y profesional:', err);
      return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }

    res.status(200).json(turnos);
  });
};

module.exports = {
  turnosDisponibles,
  turnosPorEspecialidad,
  turnosPorProfesional,
  obtenerTurnosPorFecha,
  obtenerTurnosPorFechaYProfesional,
  reservar,
  cancelar,
};