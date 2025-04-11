const express = require('express');
const router = express.Router();
const usuariosController = require('../controllers/usuariosController');

/**
 * @swagger
 * /usuarios/login:
 *   post:
 *     summary: Iniciar sesión
 *     description: Permite a un usuario iniciar sesión con su email y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: usuario@example.com
 *               contrasena:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Inicio de sesión exitoso
 *                 usuario:
 *                   type: object
 *       401:
 *         description: Credenciales inválidas.
 *       500:
 *         description: Error al verificar usuario.
 */

router.post('/login',usuariosController.login);
//router.post('/registro',usuariosController.registro);
//router.post('/recuperar',usuariosController.recuperar);
//router.get('/verPerfil',usuariosController.verPerfil); //Requiere token
//router.put('/editarPerfil',usuariosController.editarPerfil); //Requiere token
//router.get('/datosObraSocial',usuariosController.datosObraSocial); //Requiere token
//router.delete('/borrarCuenta',usuariosController.borrarCuenta); //Requiere token



module.exports = router;