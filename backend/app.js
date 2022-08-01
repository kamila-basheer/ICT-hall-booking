const express = require("express");
const mongoose = require("mongoose");

const jwt = require('jsonwebtoken');
const cors = require("cors");
const associates = require("./src/models/associates");

//port
const port = 3000;
const App = express();

//server connection

//Middlewares
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({extended:true}));

//database connection
const Mongodb = "mongodb://localhost:27017/bookingportal";



App.post('/register', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let associateData = req.body;
    console.log(associateData);
    let associate = new associates(associateData);
    associate.save((error, registeredUser)=>{
        if(error){
        console.log(error)
    } else {
        let payload={subject:registeredUser._id};
        let token = jwt.sign(payload,'secretKey');
        res.status(200).send({token});
    }
    })
})

App.post('/login', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let associateData = req.body;
    console.log(associateData);
    associates.findOne({username:associateData.username})
    .exec(function (err, item) {
        if (err) {
            console.log(err);
            res.send();
        }
            if (!item) {
                console.log("No associate");
                res.redirect('/login');
            } else {
            if (item.password !== associateData.password) {
                console.log("Incorrect password");
                // console.log("No match");
                // res.status(401).send('Invalid password');
                res.redirect('/login');
            }else{
                console.log("Match");
                let payload = {subject:item._id};
                let token= jwt.sign(payload,'secretKey');
                res.status(200).send({token});
                // res.redirect('/register')
            }
                    
            }
        })    
})



App.route("/users")
.post((req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var user ={
        Name: req.body.name,
        Email:req.body.email,
        Password:req.body.password
    }
    var user = new associates(user);
    user.save((err,data)=>{
    if(err)
    console.log(err)
    else
    console.log(data)
    });
})

App.listen(port,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server connected on port "+port)
});
