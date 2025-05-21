const express = require('express');
const router = express.Router();
const historialMedicoController = require('../controllers/historialMedicoController.js');
const verificarToken = require('../token');

// Obtener historial de turnos del usuario
<<<<<<< HEAD:routes/historialMedicos.js
router.get('/historialTurnos', historialMedicoController.obtenerHistorialTurnos);

// Obtener mis turnos médicos
router.get('/misTurnos', historialMedicoController.obtenerMisTurnos);

=======
// Turnos realizados (pasados, no cancelados)
router.get('/turnosRealizados', verificarToken, historialMedicoController.turnosRealizados);

// Turnos cancelados
router.get('/turnosCancelados',verificarToken, historialMedicoController.turnosCancelados);

// Turnos programados (futuros, no cancelados)
router.get('/turnosProgramados', verificarToken, historialMedicoController.turnosProgramados);
>>>>>>> cbadcda85466cb9c38cc9e1f298af83ad699e9c6:routes/historialMedicoRoutes.js
// Obtener notas médicas del usuario
router.get('/notasMedicas/me', verificarToken, historialMedicoController.obtenerNotasMedicas);



module.exports = router;
