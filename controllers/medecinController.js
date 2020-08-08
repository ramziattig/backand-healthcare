const express = require('express');
const bcrypt = require('bcryptjs');

const Medecin =require('./../models/medecin');

const app = express();

app.get('/',(req,res)=>{
    res.status(200).send({ message: "Welcome to Medecin Controller" })
});

app.get('/all',(req,res)=>{
    Medecin.find()
        .then((medecin)=>{
            res.send(medecin);
        })
        .catch((err)=>{
            res.send({message:"Error"});
        })
});

app.post('/registermedecin', (req,res)=> {
    //1- recupération des données
    let data= req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(data.password,salt)

    let medecin = new Medecin({
        firstname:data.firstname,
        lastname:data.lastname,
        phone:data.phone,
        email:data.email,
        adress:data.adress,
        profession:data.profession,
        password:hashedPassword,

    });

    medecin.save()
        .then((doc)=>{
            res.status(200).send({message:"patient register successfuly !"});
        })
        .catch((err)=>{
            res.status(400).send({message:"error"});
        })
});
app.post('/loginmedecin', (req, res) => {
    let data = req.body;
    console.log(data);
    res.send({ message: "medecin Logged successfully !" });
});
module.exports = app;