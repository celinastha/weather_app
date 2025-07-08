const express = require('express');
const axios = require('axios');
const app = express();
const cors = require('cors');
const routes = require('./routes/routes');

require('dotenv').config();

const PORT = import.meta.env.PORT;

app.use(express.json());
app.use(cors());

const database = require('./database');

app.use(routes);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
