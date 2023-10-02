require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 5051;
const cors = require('cors');
const connetDB = require('./config/dbConn');

connetDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/movies', require('./routes/moviesRoutes'));

app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});
