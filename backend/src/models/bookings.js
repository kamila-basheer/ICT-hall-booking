const mongoose = require("mongoose");

mongoose.connect('mongodb+srv://xyz123:fvyosiRBHs3PQDvg@cluster0.77f4z4w.mongodb.net/HallBookingPortal?retryWrites=true&w=majority',{useNewUrlParser:true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on("error",console.error.bind(console,"connection error"));
db.once("open",()=>{
    console.log("connected to Mongodb");
});

const Schema = mongoose.Schema;

const bookingSchema = new Schema({

    associateName:{
        type: String,
    },
    associateEmail:{
        type:String
    },
    associatePhone:{
        type:number
    },
    hallName:{
        type:String
    },
    fromDate:{
        type: Date
    },
    toDate:{
        type:Date
    }
    
});

const bookings = mongoose.model('bookings',bookingSchema)
module.exports= bookings;