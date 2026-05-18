const express = require("express")
const connectdb = require("./config/db")
const app = require("./app")


connectdb()

app.listen(5000,()=>{
    console.log("server is running on port 5000" )
})