const express = require('express');
const router = express.Router();
const turnosController = require('../controllers/turnosController');

//router.get('/historialTurnos', turnosController.historialTurnos);
//router.get('/misTurnos', turnosController.misTurnos);//Los turnos, tanto pasado y futuros
//router.get('/disponibles', turnosController.obtenerTurnos);
//router.get('/disponibles/especialidad/:especialidad', turnosController.obtenerTurnosByEspecialidad);
//router.get('/disponibles/profesional/:profesionalId', turnosController.obtenerTurnosByProfesional);
//router.post('/', turnosController.reservarTurno);
//router.post('/:id', turnosController.cancelarTurno);

module.exports = router;
