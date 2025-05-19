const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/historialMedicoController.js');

// Obtener historial de turnos del usuario
// Turnos realizados (pasados, no cancelados)
router.get('/turnosRealizados', historialMedicoController.turnosRealizados);

// Turnos cancelados
router.get('/turnosCancelados', historialMedicoController.turnosCancelados);

// Turnos programados (futuros, no cancelados)
router.get('/turnosProgramados', historialMedicoController.turnosProgramados);
// Obtener notas médicas del usuario
router.get('/notasMedicas/me', historialMedicoController.obtenerNotasMedicas);



module.exports = router;
