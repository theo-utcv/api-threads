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
        folder: 'publicacionesT', // Carpeta en Cloudinary donde se almacenarán las imágenes
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
    },
});

const upload = multer({ storage: storage });

// Rutas de publicaciones
router.post('/publicaciones', upload.single('imagen'), postController.crearPublicacion);
router.get('/publicaciones', postController.obtenerPublicaciones);
router.get('/publicaciones/:id', postController.obtenerPublicacionPorId);
router.put('/publicaciones/:id', upload.single('imagen'), postController.actualizarPublicacion);
router.delete('/publicaciones/:id', postController.eliminarPublicacion);

module.exports = router;