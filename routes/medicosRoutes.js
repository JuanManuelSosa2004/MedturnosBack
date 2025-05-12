const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController.js');

router.get('/:id', medicosController.obtenerMedicoById);
router.get('/especialidad/:especialidad', medicosController.obtenerMedicosByEspecialidad);
router.get('/', medicosController.medicos);

module.exports = router;
