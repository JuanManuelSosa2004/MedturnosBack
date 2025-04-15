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

/**
 * @swagger
 * /usuarios/registro:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Permite registrar un nuevo usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               contrasena:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito.
 *       409:
 *         description: El email ya está registrado.
 *       500:
 *         description: Error interno al registrar el usuario.
 */
router.post('/registro',usuariosController.registro);

//router.post('/recuperar',usuariosController.recuperar);

/**
 * @swagger
 * /usuarios/verPerfil/{id}:
 *   get:
 *     summary: Ver perfil del usuario
 *     description: Obtiene el perfil del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Perfil del usuario obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nombre:
 *                   type: string
 *                   example: Juan
 *                 apellido:
 *                   type: string
 *                   example: Pérez
 *                 email:
 *                   type: string
 *                   example: juan.perez@example.com
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno al obtener el perfil.
 */
router.get('/verPerfil/:id', usuariosController.verPerfil);

/**
 * @swagger
 * /usuarios/editarPerfil/{id}:
 *   put:
 *     summary: Editar perfil del usuario
 *     description: Permite editar el perfil del usuario.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido:
 *                 type: string
 *                 example: Pérez
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Perfil actualizado correctamente.
 *       400:
 *         description: Faltan datos para actualizar.
 *       404:
 *         description: Usuario no encontrado.
 *       500:
 *         description: Error interno al actualizar el perfil.
 */
router.put('/editarPerfil/:id', usuariosController.editarPerfilController);

/**
 * @swagger
 * /usuarios/datosObraSocial/{id}:
 *   get:
 *     summary: Obtener datos de la obra social
 *     description: Obtiene los datos de la obra social del usuario autenticado.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario.
 *     responses:
 *       200:
 *         description: Datos de la obra social obtenidos con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 obraSocial:
 *                   type: string
 *                   example: OSDE
 *                 numeroAfiliado:
 *                   type: string
 *                   example: 123456789
 *       404:
 *         description: El usuario no tiene obra social registrada.
 *       500:
 *         description: Error interno al obtener los datos de la obra social.
 */
router.get('/datosObraSocial/:id', usuariosController.datosObraSocial);

//router.delete('/borrarCuenta',usuariosController.borrarCuenta); //Requiere token


module.exports = router;