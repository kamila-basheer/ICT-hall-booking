const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://xyz123:fvyosiRBHs3PQDvg@cluster0.77f4z4w.mongodb.net/HallBookingPortal?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("connected to Mongodb");
});

const Schema = mongoose.Schema;

const associateSchema = new Schema({

    username:{
        type: String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    }
    // JoinedDate:{
    //     type: Date,
    //     default:Date.now
    // }
    
});

const associates = mongoose.model('associates',associateSchema)
module.exports= associates;
