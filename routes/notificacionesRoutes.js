const express = require('express');
const router = express.Router();
const {
  iniciarSistemaNotificaciones,
  detenerSistemaNotificaciones,
  getEstadoNotificaciones,
  verificarManualmente,
} = require('../controllers/Notificaciones/notif');

// Endpoint para obtener el estado del sistema de notificaciones
router.get('/estado', (req, res) => {
  const estado = getEstadoNotificaciones();
  res.status(200).json(estado);
});

// Endpoint para iniciar el sistema de notificaciones
router.post('/iniciar', (req, res) => {
  const resultado = iniciarSistemaNotificaciones();
  const status = resultado.success ? 200 : 400;
  res.status(status).json(resultado);
});

// Endpoint para detener el sistema de notificaciones
router.post('/detener', (req, res) => {
  const resultado = detenerSistemaNotificaciones();
  const status = resultado.success ? 200 : 400;
  res.status(status).json(resultado);
});

// Endpoint para verificar manualmente (testing)
router.post('/verificar', (req, res) => {
  const resultado = verificarManualmente();
  res.status(200).json(resultado);
});

module.exports = router;
