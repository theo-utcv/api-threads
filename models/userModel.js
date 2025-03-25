const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    correo: { type: String, required: true, unique: true },
    contrasena: { type: String, required: true },
    foto_perfil: { type: String },
    biografia: { type: String },
    seguidores: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    siguiendo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Usuario' }],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
    deleted_at: { type: Date, default: null }
});

usuarioSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

module.exports = mongoose.model('Usuario', usuarioSchema);