const express = require("express");
const dotenv = require("dotenv").config()
const cors= require("cors")
const {mongoose} = require("mongoose");
//  cookies parse
const cookiesParser = require('cookie-parser');
// line 24
const { urlencoded } = require("express")


const app = express();


// database connection

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log("Data Base connected"))
.catch((err)=>console.log("DataBase failed",err))

// middleware
app.use(express.json());
// after cookies parse
app.use(cookiesParser());
// app.use(express.urlencoded({extended:false}))
app.use(urlencoded({ extended: true }));


app.use("/", require('./routes/authRoutes'))



app.listen(process.env.PORT || 8000, ()=>{
    console.log("server loading : 8000");
})