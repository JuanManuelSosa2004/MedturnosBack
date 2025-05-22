const express = require('express');
const router = express.Router();

// Asegúrate de que el controlador se importa correctamente
const authController = require('../controllers/authcontroller'); // Ruta correcta a tu controlador

// Define las rutas y pasa las funciones como manejadores
router.post('/login', authController.login); // La función 'login' del controlador
router.post('/register', authController.registro); // La función 'register' del controlador

router.post('/forget', authController.solicitarRecuperacion);
router.post('/reset', authController.resetearContrasena);
<<<<<<< HEAD

=======
//DEPRECADOrouter.post('/logout', authController.logout);
>>>>>>> 24f49d75a71b75ffe5183e12391a587aff4d124e
module.exports = router;
