const Comentario = require('../models/commentModel'); // Asegúrate de que la ruta sea correcta
const Publicacion = require('../models/postModel'); // Para verificar la existencia de la publicación
const Usuario = require('../models/userModel'); // Para verificar la existencia del usuario

// Crear un nuevo comentario
exports.crearComentario = async (req, res) => {
    try {
        // Validar que se proporcionen los datos necesarios
        const { texto, id_publicacion, id_usuario } = req.body;
        if (!texto || !id_publicacion || !id_usuario) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Verificar que la publicación y el usuario existan
        const publicacion = await Publicacion.findById(id_publicacion);
        const usuario = await Usuario.findById(id_usuario);
        if (!publicacion || !usuario) {
            return res.status(404).json({ message: 'Publicación o usuario no encontrado' });
        }

        const nuevoComentario = new Comentario({
            texto,
            id_publicacion,
            id_usuario
        });

        await nuevoComentario.save();
        res.status(201).json(nuevoComentario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todos los comentarios de una publicación
exports.obtenerComentariosPorPublicacion = async (req, res) => {
    try {
        const { id } = req.params;
        const comentarios = await Comentario.find({ id_publicacion: id, deleted_at: null }).populate('id_usuario', 'nombre'); // Filtrar comentarios eliminados
        res.status(200).json(comentarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar un comentario
exports.actualizarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = { ...req.body };

        const comentarioActualizado = await Comentario.findByIdAndUpdate(id, updates, { new: true });
        if (!comentarioActualizado) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        res.status(200).json(comentarioActualizado);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar un comentario (soft delete)
exports.eliminarComentario = async (req, res) => {
    try {
        const { id } = req.params;
        const comentario = await Comentario.findById(id);
        if (!comentario) {
            return res.status(404).json({ message: 'Comentario no encontrado' });
        }

        // Establecer la fecha de eliminación
        comentario.deleted_at = Date.now();
        await comentario.save();

        res.status(200).json({ message: 'Comentario eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};