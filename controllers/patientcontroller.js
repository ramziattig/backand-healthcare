const express = require('express');
const bcrypt = require('bcryptjs');

const Patient =require('./../models/patient');

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send({ message: "Welcome to Patient Controller" })
});

app.get('/all',(req,res)=>{
    Patient.find()
        .then((patient)=>{
            res.send(patient);
        })
        .catch((err)=>{
            res.send({message:"Error"});
        })
});

app.post('/registerpatient', (req,res)=> {
    //1- recupération des données
    let data= req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password,salt)

    let patient = new Patient({
        firstname:data.firstname,
        lastname:data.lastname,
        phone:data.phone,
        email:data.email,
        password:hashedPassword,

    });

    patient.save()
        .then((doc)=>{
            res.status(200).send({message:"patient register successfuly !"});
        })
        .catch((err)=>{
            res.status(400).send({message:"error"});
        })
});
app.post('/loginpatient', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send({ message: "patient Logged successfully !" });
});
module.exports=app;