const mongoose = require('mongoose');

const publicacionSchema = new mongoose.Schema({
    contenido: { type: String, required: true },
    imagen: { type: String },
    fecha_creacion: { type: Date, default: Date.now },
    id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    me_gusta: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    comentarios: [{
        id_comentario: { type: mongoose.Schema.Types.ObjectId, ref: 'Comentario' },
        texto: { type: String, required: true },
        id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
        fecha_creacion: { type: Date, default: Date.now }
    }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});

// Middleware para actualizar el campo updated_at
publicacionSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Publicacion', publicacionSchema);