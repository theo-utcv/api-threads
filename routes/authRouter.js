const express = require("express");
const User = require("../models/userModel");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

require('dotenv').config();

const router = express.Router();

//login
router.post('/login', async (req, res) => {
    const { correo, contrasena } = req.body;

    const user = await User.findOne({ correo });
    if (!user) return res.status(400).json({
        message: 'Usuario no encontrado'
    });

    const isMatch = await bcrypt.compare(
        contrasena, user.contrasena);
    if (!isMatch) return res.status(400).json({
        message: 'Contraseña incorrecta'
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
        user: {
            id: user._id,
            nombre: user.nombre,
            correo: user.correo
        }, token
    });
});

//logout(solo para frontend, el token se elimina del cliente)
router.post('/logout', (req, res) => {
    res.json({ message: 'logout exitoso' });
});

router.post('/register', async (req, res) => {
    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    //validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
        return res.status(400).json({ message: 'El email no es valido' });
    }

    try {
        let user = await User.findOne
            ({ correo });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya exite' });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(contrasena, salt);
        user = new User({
            nombre,
            correo,
            contrasena: hash
        });

        await user.save();

        const payload = { user: { id: user._id } };
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error en el servidor');




    }
});

module.exports = router;
