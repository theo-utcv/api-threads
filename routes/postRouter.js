const express = require('express');
const postController = require('../controllers/postController');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

// Configuración de almacenamiento para imágenes
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'publicacionesT',
        allowed_formats: ['jpg', 'png', 'jpeg'],
    },
});

const upload = multer({ storage: storage });

/**
 * @swagger
 * tags:
 *   name: Publicaciones
 *   description: API para gestionar publicaciones
 */

/**
 * @swagger
 * /publicaciones:
 *   post:
 *     summary: Crear una nueva publicación
 *     tags: [Publicaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               imagen:
 *                 type: string
 *               id_usuario:
 *                 type: string
 *             required:
 *               - contenido
 *               - id_usuario
 *     responses:
 *       201:
 *         description: Publicación creada exitosamente
 *       400:
 *         description: Faltan datos requeridos
 *       500:
 *         description: Error en el servidor
 */
router.post('/publicaciones', upload.single('imagen'), postController.crearPublicacion);

/**
 * @swagger
 * /publicaciones:
 *   get:
 *     summary: Obtener todas las publicaciones
 *     tags: [Publicaciones]
 *     responses:
 *       200:
 *         description: Lista de publicaciones
 *       500:
 *         description: Error en el servidor
 */
router.get('/publicaciones', postController.obtenerPublicaciones);

/**
 * @swagger
 * /publicaciones/{id}:
 *   get:
 *     summary: Obtener una publicación por ID
 *     tags: [Publicaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación encontrada
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.get('/publicaciones/:id', postController.obtenerPublicacionPorId);

/**
 * @swagger
 * /publicaciones/{id}:
 *   put:
 *     summary: Actualizar una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Publicación actualizada
 *       404:
 *         description: Publicación no encontrada
 *       400:
 *         description: Error en la solicitud
 *       500:
 *         description: Error en el servidor
 */
router.put('/publicaciones/:id', upload.single('imagen'), postController.actualizarPublicacion);

/**
 * @swagger
 * /publicaciones/{id}:
 *   delete:
 *     summary: Eliminar una publicación
 *     tags: [Publicaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la publicación
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Publicación eliminada correctamente
 *       404:
 *         description: Publicación no encontrada
 *       500:
 *         description: Error en el servidor
 */
router.delete('/publicaciones/:id', postController.eliminarPublicacion);

module.exports = router;