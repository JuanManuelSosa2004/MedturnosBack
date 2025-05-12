const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');
const verificarToken = require('../token'); // Importa directamente la función
router.get('/me', verificarToken, UsersController.getProfile);
router.put('/me', verificarToken, UsersController.updateProfile);
router.delete('/me', verificarToken, UsersController.deleteAccount);
router.get('/afiliado', verificarToken, UsersController.getAfiliado);

module.exports = router;
