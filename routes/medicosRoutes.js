const express = require('express');
const router = express.Router();
const medicosController = require('../controllers/medicosController.js');

/**
 * @swagger
 * /medicos/{id}:
 *   get:
 *     summary: Obtener un médico por ID
 *     description: Devuelve los datos de un médico específico según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico.
 *     responses:
 *       200:
 *         description: Médico encontrado con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_profesional:
 *                   type: integer
 *                   example: 1
 *                 nombre_profesional:
 *                   type: string
 *                   example: Dr. Juan Pérez
 *                 email:
 *                   type: string
 *                   example: juan.perez@example.com
 *                 ubicacion:
 *                   type: string
 *                   example: Buenos Aires
 *                 id_especialidad:
 *                   type: integer
 *                   example: 3
 *       404:
 *         description: Médico no encontrado.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/:id', medicosController.obtenerMedicoById);

/**
 * @swagger
 * /medicos/especialidad/{especialidad}:
 *   get:
 *     summary: Obtener médicos por especialidad
 *     description: Devuelve una lista de médicos que pertenecen a una especialidad específica.
 *     parameters:
 *       - in: path
 *         name: especialidad
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la especialidad.
 *     responses:
 *       200:
 *         description: Lista de médicos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_profesional:
 *                     type: integer
 *                     example: 1
 *                   nombre_profesional:
 *                     type: string
 *                     example: Dr. Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juan.perez@example.com
 *                   ubicacion:
 *                     type: string
 *                     example: Buenos Aires
 *                   especialidad:
 *                     type: string
 *                     example: Cardiología
 *       404:
 *         description: No se encontraron médicos para la especialidad especificada.
 *       500:
 *         description: Error interno del servidor.
 */
router.get('/especialidad/:especialidad', medicosController.obtenerMedicosByEspecialidad);

/**
 * @swagger
 * /medicos:
 *   get:
 *     summary: Obtener todos los médicos
 *     description: Devuelve una lista de todos los médicos registrados.
 *     responses:
 *       200:
 *         description: Lista de médicos obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_profesional:
 *                     type: integer
 *                     example: 1
 *                   nombre_profesional:
 *                     type: string
 *                     example: Dr. Juan Pérez
 *                   email:
 *                     type: string
 *                     example: juan.perez@example.com
 *                   ubicacion:
 *                     type: string
 *                     example: Buenos Aires
 *                   id_especialidad:
 *                     type: integer
 *                     example: 3
 *       500:
 *         description: Error interno al obtener la lista de médicos.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: Error interno al obtener la lista de médicos
 */
router.get('/', medicosController.medicos);

module.exports = router;
