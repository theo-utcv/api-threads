const express = require("express");
const cors = require("cors");
const connectDB = require('./config/db');
const userRoutes = require("./routes/userRouter");
const authRoutes = require('./routes/authRouter');

require('dotenv').config();

const app = express();

connectDB();

app.use(express.json());
app.use(cors());

app.use('/api', userRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
