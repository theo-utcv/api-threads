const express = require('express');
const usuarioController = require('../controllers/userController');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinaryConfig');

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'usuariosT', // Carpeta en Cloudinary donde se almacenarán las imágenes
        allowed_formats: ['jpg', 'png', 'jpeg'], // Formatos permitidos
    },
});

const upload = multer({ storage: storage });


router.post('/usuarios', upload.single('foto_perfil'), usuarioController.crearUsuario);
router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

module.exports = router;