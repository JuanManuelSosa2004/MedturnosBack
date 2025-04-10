const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');




router.post('/login',usuariosController.login);
router.post('/registro',usuariosController.registro);
//router.post('/recuperar',usuariosController.recuperar);
router.get('/verPerfil',usuariosController.verPerfil); //Requiere token
router.put('/editarPerfil/:id', usuariosController.editarPerfil);
router.get('/datosObraSocial',usuariosController.datosObraSocial); //Requiere token
//router.delete('/borrarCuenta',usuariosController.borrarCuenta); //Requiere token



module.exports = router;