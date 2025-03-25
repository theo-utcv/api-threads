const mongoose = require('mongoose');

const comentarioSchema = new mongoose.Schema({
    texto: { type: String, required: true, maxlength: 500 }, // Limitar la longitud del texto
    id_publicacion: { type: mongoose.Schema.Types.ObjectId, ref: 'Publicacion', required: true, index: true },
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true, index: true },
    fecha_creacion: { type: Date, default: Date.now },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});

// Middleware para actualizar el campo updated_at
comentarioSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Comentario', comentarioSchema);