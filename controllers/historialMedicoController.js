const {
  obtenerTurnosRealizados,
  obtenerTurnosCancelados,
  obtenerTurnosProgramados,
  obtenerNotasMedicas,
  obtenerImagenesHistorial,
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

module.exports = {
  turnosRealizados,
  turnosCancelados,
  turnosProgramados,
  obtenerNotasMedicas: obtenerNotasMedicasController,
  imagenesHistorial,
};