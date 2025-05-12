const express = require('express');
const router = express.Router();
const TurnosController = require('../controllers/turnos.controller');

router.get('/disponibles', TurnosController.getDisponibles);
router.get('/disponibles/especialidad/:especialidad', TurnosController.getByEspecialidad);
router.get('/disponibles/profesional/:profesional_id', TurnosController.getByProfesional);

module.exports = router;
