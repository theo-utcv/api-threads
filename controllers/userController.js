const Usuario = require('../models/userModel');
const cloudinary = require('../config/cloudinaryConfig');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        // Cargar la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        const nuevoUsuario = new Usuario({
            ...req.body,
            foto_perfil: result.secure_url // Guardar la URL de la imagen en la base de datos
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};