const Usuario = require('../models/userModel');
const cloudinary = require('../config/cloudinaryConfig');
const bcrypt = require('bcryptjs');

// Crear un nuevo usuario
exports.crearUsuario = async (req, res) => {
    try {
        // Validar que se proporcionen los datos necesarios
        if (!req.body.nombre || !req.body.correo || !req.body.contrasena) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Cargar la imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Hacer hash de la contraseña
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.contrasena, salt);

        const nuevoUsuario = new Usuario({
            ...req.body,
            contrasena: hashedPassword, // Guardar la contraseña hasheada
            foto_perfil: result.secure_url // Guardar la URL de la imagen en la base de datos
        });

        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario); // Retornar el nuevo usuario, incluyendo la contraseña hasheada
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los usuarios
exports.obtenerUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find(); // Retornar todos los usuarios, incluyendo contraseñas hasheadas
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener un usuario por ID
exports.obtenerUsuarioPorId = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.params.id); // Retornar el usuario, incluyendo la contraseña hasheada
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un usuario
exports.actualizarUsuario = async (req, res) => {
    try {
        const updates = { ...req.body };

        // Si se proporciona una nueva foto, cargarla a Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updates.foto_perfil = result.secure_url; // Actualizar la URL de la imagen
        }

        // Si se proporciona una nueva contraseña, hacer hash
        if (updates.contrasena) {
            const salt = await bcrypt.genSalt(10);
            updates.contrasena = await bcrypt.hash(updates.contrasena, salt);
        }

        const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!usuarioActualizado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        res.status(200).json(usuarioActualizado); // Retornar el usuario actualizado, incluyendo la contraseña hasheada
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un usuario
exports.eliminarUsuario = async (req, res) => {
    try {
        const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
        if (!usuarioEliminado) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};