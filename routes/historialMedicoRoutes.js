const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/historialMedicoController.js');
const verificarToken = require('../token');

router.get('/turnosRealizados', verificarToken, historialMedicoController.turnosRealizados);
router.get('/turnosCancelados', verificarToken, historialMedicoController.turnosCancelados);
router.get('/turnosProgramados', verificarToken, historialMedicoController.turnosProgramados);
router.get('/notasMedicas/me', verificarToken, historialMedicoController.obtenerNotasMedicas);
router.get('/notasMedicas/:id_turno', verificarToken, historialMedicoController.obtenerNotaMedicaPorTurno);

module.exports = router;
