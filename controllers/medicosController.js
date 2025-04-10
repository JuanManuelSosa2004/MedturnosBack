const {
    obtenerTodosLosMedicos,
    obtenerMedicoPorId,
    obtenerMedicosPorEspecialidad
  } = require('../models/medicosModel');
  
  // GET /medicos
  const medicos = (req, res) => {
    obtenerTodosLosMedicos((err, resultado) => {
      if (err) {
        console.error('Error al obtener médicos:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
      res.status(200).json(resultado);
    });
  };
  
  // GET /medicos/:id
  const obtenerMedicoById = (req, res) => {
    const id = req.params.id;
  
    obtenerMedicoPorId(id, (err, medico) => {
      if (err) {
        console.error('Error al buscar médico por ID:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
  
      if (!medico) {
        return res.status(404).json({ mensaje: 'Médico no encontrado' });
      }
  
      res.status(200).json(medico);
    });
  };
  
  // GET /medicos/especialidad/:especialidad
  const obtenerMedicosByEspecialidad = (req, res) => {
    const especialidad = req.params.especialidad;
  
    obtenerMedicosPorEspecialidad(especialidad, (err, resultados) => {
      if (err) {
        console.error('Error al obtener médicos por especialidad:', err);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
      }
  
      res.status(200).json(resultados);
    });
  };
  
  module.exports = {
    medicos,
    obtenerMedicoById,
    obtenerMedicosByEspecialidad
  };
  