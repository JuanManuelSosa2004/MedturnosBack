const express = require('express');
const router = express.Router();
const TurnosController = require('../controllers/turnosController');

// visualizacion
router.get('/disponibles', TurnosController.turnosDisponibles);
router.get('/disponibles/especialidad/:especialidad', TurnosController.turnosPorEspecialidad);
router.get('/disponibles/profesional/:profesional_id', TurnosController.turnosPorProfesional);

// accion
router.post('/:id/reservar', TurnosController.reservar);
router.delete('/:id', TurnosController.cancelar);

module.exports = router;
