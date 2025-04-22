const express = require('express');
const router = express.Router();

const turnosController = require('../controllers/turnosController');

/**
 * @swagger
 * /turnos/{id}:
 *   get:
 *     summary: Obtener un turno por ID
 *     description: Devuelve una lista de turnos asociados a un usuario específico.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del médico.
 *     responses:
 *       200:
 *         description: Turnos encontrados con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_turno:
 *                     type: integer
 *                     example: 1
 *                   id_profesional:
 *                     type: integer
 *                     example: 1
 *                   id_especialidad:
 *                     type: integer
 *                     example: 1
 *                   fecha:
 *                     type: string
 *                     format: date
 *                     example: "2023-10-01"
 *                   hora:
 *                     type: string
 *                     format: time
 *                     example: "14:30:00"
 *       404:
 *        description: Turnos no encontrado.
 *       500:
 *         description: Error interno del servidor al obtener los turnos.
 */
router.get('/historialTurnos', turnosController.historialTurnos);


//router.get('/misTurnos', turnosController.misTurnos);//Los turnos, tanto pasado y futuros
//router.get('/disponibles', turnosController.obtenerTurnos);
//router.get('/disponibles/especialidad/:especialidad', turnosController.obtenerTurnosByEspecialidad);
//router.get('/disponibles/profesional/:profesionalId', turnosController.obtenerTurnosByProfesional);
//router.post('/', turnosController.reservarTurno);
//router.post('/:id', turnosController.cancelarTurno);

module.exports = router;
