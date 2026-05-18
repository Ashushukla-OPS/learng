
require("dotenv").config()
const mongoose = require("mongoose")
const express = require("express")


const connectdb = async()=>{
 try{

await mongoose.connect(process.env.MONGO_URI)
console.log("db conected...");

}
catch(error){
    console.log("error in db connection");
    
}
}
module.exports =connectdb