const cron = require('node-cron');
const {
  getDisponibles,
  getByEspecialidad,
  getByProfesional,
  reservarTurno,
  cancelarTurno,
  getTurnosPorFecha,
  getTurnosPorFechaYProfesional,
  marcarTurnosRealizadosAutomaticamente,
  cancelarTurnosDisponiblesVencidos,
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

const reservar = (req, res) => {
  const { id } = req.params; // ID del turno
  const { id_usuario } = req.body; // Cambia a id_usuario para coincidir con el JSON enviado

  console.log('ID del turno:', id); // Log para verificar el ID del turno
  console.log('ID del usuario:', id_usuario); // Log para verificar el ID del usuario

  if (!id_usuario) {
    return res.status(400).json({ mensaje: 'El ID del usuario es obligatorio' });
  }

  reservarTurno(id, id_usuario, (err, resultado) => {
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


const configurarMarcadoAutomatico = () => {
  // Ejecutar cada 3 días a las 2:00 AM
  cron.schedule('0 2 */3 * *', () => {
    marcarTurnosRealizadosAutomaticamente((err, resultado1) => {
      if (err) {
        console.error('Error en limpieza:', err.message);
        return;
      }
      
      cancelarTurnosDisponiblesVencidos((err, resultado2) => {
        if (err) {
          console.error('Error en limpieza:', err.message);
        } else {
          console.log('Realizada la limpieza de turnos');
        }
      });
    });
  });
};

const inicializarProcesosAutomaticos = () => {
  console.log('🧹 Limpieza automática de turnos configurada (cada 3 días)');
  configurarMarcadoAutomatico();
};

inicializarProcesosAutomaticos();

module.exports = {
  turnosDisponibles,
  turnosPorEspecialidad,
  turnosPorProfesional,
  obtenerTurnosPorFecha,
  obtenerTurnosPorFechaYProfesional,
  reservar,
  cancelar,
};