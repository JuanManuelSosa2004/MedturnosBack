const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/usersController');

router.get('/me', UsersController.getProfile);
router.put('/me', UsersController.updateProfile);
router.delete('/me', UsersController.deleteAccount);
router.get('/afiliado', UsersController.getAfiliado);

module.exports = router;
