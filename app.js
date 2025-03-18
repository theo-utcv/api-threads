const express = require("express");
require('dotenv').config();

const app = express();

app.use(express.json());

const PORT = process.env.APP_PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
