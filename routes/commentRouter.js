const express = require('express');
const commentController = require('../controllers/commentController');
const router = express.Router();

// Rutas de comentarios
router.post('/comentarios', commentController.crearComentario);
router.get('/publicaciones/:id/comentarios', commentController.obtenerComentariosPorPublicacion);
router.put('/comentarios/:id', commentController.actualizarComentario);
router.delete('/comentarios/:id', commentController.eliminarComentario);

module.exports = router;