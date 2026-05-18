require("dotenv").config()
const nodemailer = require("nodemailer")
const sendEmail=async({to,subject,html})=>
    {
    try{
    const transporter = nodemailer.createTransport({
       service:"gmail",

       auth:{
        user: process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS
       } 

    })

    const info = transporter.sendMail({
        from: `<${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    })
     console.log("Email sent successfully:", info.messageId);
     return info
    }
    
    catch(error) {
    console.log("Email sending error:", error);
   
  }
    }
module.exports = sendEmail;
