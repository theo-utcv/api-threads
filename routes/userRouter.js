const express = require('express');
const usuarioController = require('../controllers/userController');
const router = express.Router();

router.post('/usuarios', usuarioController.crearUsuario);
router.get('/usuarios', usuarioController.obtenerUsuarios);
router.get('/usuarios/:id', usuarioController.obtenerUsuarioPorId);

module.exports = router;