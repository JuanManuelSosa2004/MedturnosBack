const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/historialMedicoController.js');
const verificarToken = require('../token');

// Obtener historial de turnos del usuario
// Turnos realizados (pasados, no cancelados)
router.get('/turnosRealizados', verificarToken, historialMedicoController.turnosRealizados);

// Turnos cancelados
router.get('/turnosCancelados',verificarToken, historialMedicoController.turnosCancelados);

// Turnos programados (futuros, no cancelados)
router.get('/turnosProgramados', verificarToken, historialMedicoController.turnosProgramados);
// Obtener notas médicas del usuario
router.get('/notasMedicas/me', verificarToken, historialMedicoController.obtenerNotasMedicas);



module.exports = router;
