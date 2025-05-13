const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController.js');

router.get('/especialidad/:especialidad', medicosController.obtenerMedicosByEspecialidad);
router.get('/:id', medicosController.obtenerMedicoById);
router.get('/', medicosController.medicos);

module.exports = router;
