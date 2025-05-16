const express = require('express');
const router = express.Router();
const TurnosController = require('../controllers/turnos.controller');
//visualizacion
router.get('/disponibles', TurnosController.getDisponibles);
router.get('/disponibles/especialidad/:especialidad', TurnosController.getByEspecialidad);
router.get('/disponibles/profesional/:profesional_id', TurnosController.getByProfesional);

//accion
router.post('/:id/reservar', TurnosController.reservarTurno);
router.delete('/:id', TurnosController.cancelarTurno);

module.exports = router;
