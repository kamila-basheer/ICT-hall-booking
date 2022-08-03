const express = require("express");



const jwt = require('jsonwebtoken');


const cors = require("cors")

const associates = require("./src/models/associates")
const bookings = require("./src/models/bookings")



//port
const port = 3000;
const App = express();

function verifyToken(req,res,next){
  if(!req.headers.authorization){
    return res.status(401).send('Unauthorized request');
  }
  let token = req.headers.authorization.split(' ')[1];
  console.log(token);
  if(token==null){
    return res.status(401).send('Unauthorized request');
  }
  let payload=jwt.verify(token,'secretKey')
  console.log(payload);
  if(!payload){
    return res.status(401).send('Unauthorized request');
  }
  req.username=payload.username;
  req.email=payload.email;
  
  next();
}


//Middlewares
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({extended:true}));


App.post('/register', function(req,res){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    let associateData = req.body;
    console.log(associateData);
    let associate = new associates(associateData);
        associate.save((error, registeredUser)=>{
        if(error){
            res.status(401).json({message:"Email already exists"});
        console.log(error)
    } else {
        let payload={username:registeredUser.username,
                     email:registeredUser.email};
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
                console.log('no user');                
                          
                res.status(401).json({message:"Username does not exist"});
               
            } else {
            if (item.password !== associateData.password) {
                console.log("Incorrect password");
                
                res.status(401).json({message:"Incorrect Password"});
                
            }else{
                console.log("Match");
                let payload = {username:item.username,
                               email:item.email};
                let token= jwt.sign(payload,'secretKey');
                res.status(200).send({token});
               
            }
                    
            }
        })    
})

 


App.route("/users")
.post((req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var user ={
        username: req.body.name,
        email:req.body.email,
        password:req.body.password
    }
    var user = new associates(user);
    user.save((err,data)=>{
    if(err)
    console.log(err)
    else
    console.log(data)
    });
})

// App.route("/book-hall")
App.post("/book-hall",verifyToken,(req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.username);
    console.log(req.email);
    
    var booking ={
        associateName: req.username,
        associateemail:req.email,
        hallName:req.body.item.hallName,
        Date:req.body.item.Date,
        fromTime:req.body.item.fromTime,
        toTime:req.body.item.toTime
    }
    
// booking.fromTime= booking.fromTime;
    var booking = new bookings(booking);
    booking.save((err,data)=>{
    if(err)
    console.log(err)
    else
    console.log(data)
    });
})

// App.route("/checkslot")
App.post("/checkslot", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
     
    var  date ={
        associateName: req.username,
        associateemail:req.email,
        hallName:req.body.item.hallname,
        Date:req.body.item.date,
        fromTime:req.body.item.fromtime,
        toTime:req.body.item.totime
    }
    ////

    let day =date.Date.split('T')[0];
    date.fromTime=day+"T"+date.fromTime+":00"
    date.toTime=day+"T"+date.toTime+":00"
    ///

        bookings.find({"hallName":date.hallName,"fromTime":{$lt: (date.toTime)},"toTime":{$gt: (date.fromTime)}},(err,data)=>{
       if(err)
        console.log(err)
        else
        {
            if(data.length!==0)
            {
                var msg = "slotunavailable";
                 res.status(200).send(false);
            }
            else
            {
                console.log("available")
                res.status(200).send(date);}

        }

    })
});

// App.route("/getbookingdetails")
App.post("/getbookingdetail", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
var uname = req.username;
bookings.find({"associateName":uname},(err,data)=>{
    if(err)
    console.log(err)
    else
    {
        res.send(data)
    }
})
})


App.get("/getbookingdetails", verifyToken, (req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    var uname = req.username;
    // bookings.find({"associateName":uname})
    // .then(data=>{
    //     res.send(data);
    // })
    bookings.find({"associateName":uname},(err,data)=>{
        if(err)
        console.log(err)
        else
        {
            res.send(data)
        }
    })
});

App.route("/deletebooking")
.post((req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
    console.log(req.body)
    let id = req.body.id;
    bookings.deleteOne({"_id":id})
    .then((err,data)=>{
        if(err)
        console.log(err)
    });
    console.log("Success")
});

App.get("/currentbookings", verifyToken,(req,res)=>{
    res.header("Access-Contol-Allow-Origin","*");
    res.header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");

    let todayDate = new Date();
    let afterDate = new Date();
    afterDate.setDate(afterDate.getDate() + 7);
    console.log(todayDate);
    console.log(afterDate);

    bookings.aggregate([
        {
            "$match":
                {   
                    "associateName": req.username,
                    "Date":
                        {
                            "$lte": afterDate,
                            "$gte": todayDate
                        }
                }
        }
    ],function(err, docs) {
        if (err) {
            console.log(err);
            return;
        } else {
            console.log("Successful loaded data");
            res.send(docs);
        }
    }) 

})


App.listen(port,(err)=>{
    if(err)
    console.log(err)
    else
    console.log("Server connected on port "+port)
});