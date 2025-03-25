const Publicacion = require('../models/postModel');
const cloudinary = require('../config/cloudinaryConfig'); // Si usas Cloudinary para imágenes

// Crear una nueva publicación
exports.crearPublicacion = async (req, res) => {
    try {
        // Validar que se proporcionen los datos necesarios
        if (!req.body.contenido || !req.body.id_usuario) {
            return res.status(400).json({ message: 'Faltan datos requeridos' });
        }

        // Cargar la imagen a Cloudinary si se proporciona
        let imagenUrl = null;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            imagenUrl = result.secure_url; // Guardar la URL de la imagen
        }

        const nuevaPublicacion = new Publicacion({
            contenido: req.body.contenido,
            imagen: imagenUrl, // Guardar la URL de la imagen si existe
            id_usuario: req.body.id_usuario // Asegúrate de que el ID del usuario se pase correctamente
        });

        await nuevaPublicacion.save();
        res.status(201).json(nuevaPublicacion);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Obtener todas las publicaciones
// Obtener todas las publicaciones
exports.obtenerPublicaciones = async (req, res) => {
    try {
        const publicaciones = await Publicacion.find({ deleted_at: null }).populate('id_usuario', 'nombre');
        res.status(200).json(publicaciones);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Obtener una publicación por ID
exports.obtenerPublicacionPorId = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id).populate('id_usuario', 'nombre');
        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.status(200).json(publicacion);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Actualizar una publicación
exports.actualizarPublicacion = async (req, res) => {
    try {
        const updates = { ...req.body };

        // Si se proporciona una nueva imagen, cargarla a Cloudinary
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            updates.imagen = result.secure_url; // Actualizar la URL de la imagen
        }

        const publicacionActualizada = await Publicacion.findByIdAndUpdate(req.params.id, updates, { new: true });
        if (!publicacionActualizada) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        res.status(200).json(publicacionActualizada);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Eliminar una publicación (soft delete)
exports.eliminarPublicacion = async (req, res) => {
    try {
        const publicacion = await Publicacion.findById(req.params.id);
        if (!publicacion) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }

        // Establecer la fecha de eliminación
        publicacion.deleted_at = Date.now();
        await publicacion.save();

        res.status(200).json({ message: 'Publicación eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};