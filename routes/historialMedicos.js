const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/historialMedicoController.js');

// Obtener historial de turnos del usuario
router.get('/historialTurnos', historialMedicoController.obtenerHistorialTurnos);

// Obtener mis turnos médicos
router.get('/misTurnos', historialMedicoController.obtenerMisTurnos);

// Obtener notas médicas del usuario
router.get('/notasMedicas/me', historialMedicoController.obtenerNotasMedicas);



module.exports = router;
