const {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
  obtenerNotasMedicas,
  obtenerImagenesHistorial,
  obtenerNotaMedicaPorTurno,
} = require('../models/historialMedicoModel');

const turnosRealizados = (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  if (!id_usuario) return res.status(401).json({ mensaje: 'No autorizado' });
  obtenerTurnosRealizados(id_usuario, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno del servidor' });
    res.status(200).json(resultados);
  });
};

const turnosCancelados = (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  if (!id_usuario) return res.status(401).json({ mensaje: 'No autorizado' });
  obtenerTurnosCancelados(id_usuario, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno del servidor' });
    res.status(200).json(resultados);
  });
};

const turnosProgramados = (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  if (!id_usuario) return res.status(401).json({ mensaje: 'No autorizado' });
  obtenerTurnosProgramados(id_usuario, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno del servidor' });
    res.status(200).json(resultados);
  });
};

const obtenerNotasMedicasController = (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  if (!id_usuario) return res.status(401).json({ mensaje: 'No autorizado' });
  obtenerNotasMedicas(id_usuario, (err, resultados) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno al obtener las notas médicas.' });
    res.status(200).json(resultados);
  });
};

const imagenesHistorial = (req, res) => {
  const id_usuario = req.user?.id_usuario || req.user?.id;
  if (!id_usuario) return res.status(401).json({ mensaje: 'No autorizado' });
  obtenerImagenesHistorial(id_usuario, (err, imagenes) => {
    if (err) return res.status(500).json({ mensaje: 'Error interno del servidor' });
    res.status(200).json({ imagenes });
  });
};

const obtenerNotaMedicaPorTurnoController = (req, res) => {
  const { id_turno } = req.params;
  if (!id_turno) {
    return res.status(400).json({ mensaje: 'No se proporcionó el ID del turno' });
  }
  obtenerNotaMedicaPorTurno(id_turno, (err, nota) => {
    if (err) {
      console.error('Error al obtener la nota médica:', err);
      return res.status(500).json({ mensaje: 'Error interno al obtener la nota médica' });
    }
    if (!nota) {
      return res.status(404).json({ mensaje: 'Nota médica no encontrada para el turno especificado' });
    }
    res.status(200).json(nota);
  });
};

module.exports = {
  turnosRealizados,
  turnosCancelados,
  turnosProgramados,
  obtenerNotasMedicas: obtenerNotasMedicasController,
  imagenesHistorial,
  obtenerNotaMedicaPorTurno: obtenerNotaMedicaPorTurnoController,
};