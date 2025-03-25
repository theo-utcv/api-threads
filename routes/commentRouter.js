const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Comentarios
 *   description: API para gestionar comentarios
 */

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crear un nuevo comentario
 *     tags: [Comentarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *               id_publicacion:
 *                 type: string
 *               id_usuario:
 *                 type: string
 *             required:
 *               - texto
 *               - id_publicacion
 *               - id_usuario
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *       400:
 *         description: Faltan datos requeridos
 *       404:
 *         description: Publicación o usuario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.post('/comentarios', commentController.crearComentario);

/**
 * @swagger
 * /publicaciones/{id}/comentarios:
 *   get:
 *     summary: Obtener todos los comentarios de una publicación
 *     tags: [Comentarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de comentarios
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/publicaciones/:id/comentarios', commentController.obtenerComentariosPorPublicacion);

/**
 * @swagger
 * /comentarios/{id}:
 *   put:
 *     summary: Actualizar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               texto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Comentario actualizado
 *       404:
 *         description: Comentario no encontrado
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.put('/comentarios/:id', commentController.actualizarComentario);

/**
 * @swagger
 * /comentarios/{id}:
 *   delete:
 *     summary: Eliminar un comentario
 *     tags: [Comentarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del comentario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Comentario eliminado correctamente
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error en el servidor
 */
router.delete('/comentarios/:id', commentController.eliminarComentario);

module.exports = router;