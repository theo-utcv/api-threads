const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRouter");
const authRoutes = require('./routes/authRouter');
const postRoutes = require("./routes/postRouter");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Configuración de CORS y JSON
app.use(express.json());
app.use(cors());

// Swagger configuration
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Clon de Threads",
            version: "1.0.0",
            description: "Documentación de la API para el clon de Threads",
            contact: {
                name: "DevLS",
                url: "http://devls.com",
                email: "support@devls.com"
            },
        },
        servers: [
            {
                url: "http://localhost:3000/api", // Cambia esto si es necesario
            },
        ],
    },
    apis: ["./routes/*.js"], // Ruta a tus archivos de rutas
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rutas de la API
app.use('/api', userRoutes);
app.use('/api', postRoutes);
app.use('/auth', authRoutes);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Algo salió mal', error: err.message });
});

// Iniciar el servidor
const PORT = process.env.APP_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;