const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const mongoose = require('./configdb/db');

const patientController= require('./controllers/patientcontroller');
const medecinController= require('./controllers/medecinController');
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.use('/patient', patientController);
app.use('/medecin',medecinController);

app.get('/', function (req, res) {
    res.send("Welcome to the server !");
})

app.listen(3000, ()=>console.log("server Steted !"));