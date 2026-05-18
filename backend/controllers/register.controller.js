require("dotenv").config()
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const sendEmail = require("../utils/send.email")
const express = require("express")
const UserModel = require("../model/user.model")
const cookieParser = require("cookie-parser") 
const registerController= async(req,res)=>
    {
try{
  let {userName , email, password} = req.body
  if(!email||!password||!userName){
    return res.status(400).json({
        sucess:false,
        message:"All fields are required"
    })
  }
  const isExisted = await UserModel.findOne({email})
  if(isExisted){
    return res.status(409).json({
        message:"user alredy registerd"
    })
  }
  const hashPass = await  bcrypt.hash(password, 10)
  const user = await UserModel.create({
userName,email,password:hashPass
  })
  const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:"1h"})
   
  res.cookie("token", token)


    await sendEmail({
      to: user.email,
      subject: `${user.userName} has registered successfully`,
      html: `
        <h2>Hello ${user.userName}</h2>
        <p>You have successfully registered in to your LearnLog account.</p>
        <p>If this was not you, please change your password immediately.</p>
      `,
    });


  return res.status(201).json({
    success:true,
    message:"user registerd succesfully",
    user
  })
}
catch(error){
    console.log(error);
    return res.status(500).json({
        sucess:false,
        message: "Internal server error",
        error:error.message
    })  
}
}

const loginController= async(req,res)=>{
    try{
  let {email,password} = req.body
  if(!email||!password){
    return res.status(404).json({
        message:"All fields are required"
    })
  }
  const user =   await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({
            sucess:false,
            message:"user not registerd"
        })
    }
    const token = jwt.sign({userId:user._id}, process.env.SECRET_KEY,{expiresIn:"1d"})
    res.cookie("token", token)
    return res.status(201).json({
        message:"user logged in successfully",
        user
    })
    }
    catch(error){
        return res.status(404).json({
            message:"error in login",
            error:error.message
        })
    }
}
const getmecontroller = async(req,res)=>{
   let user = req.user
  return res.status(200).json({
    success: true,
    message: "User fetched successfully",
    user,
  });
}
const logoutcontroller = async(req,res)=>{
    res.clearCookie("token")
    return res.status(201).json({
        message: "loggedout successfully"
    })
}
const forgetpasswordcontroller = async(req,res)=>{
    try{
        const {email} = req.body
    if(!email){
        return res.status(404).json({
            message:"Pls enter your email"
        })
    }
    let user = await UserModel.findOne({email})
    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }
      const rawToken = await jwt.sign({userId:user.id}, process.env.RESET_SECRET_KEY,{expiresIn:"20m"})

    const resetLink = `http://localhost:5173/reset-password/${rawToken}`;

      await sendEmail({
        to:user.email,
        subject:"Reset your password",
        html:`
        <h1>hello ${user.userName} you password reset link is below <h1/>
        <p>click below to reset your password <p/>
         <a href="${resetLink}">Reset Password</a>
        `
      })
       return res.status(200).json({
      success: true,
      message: "Reset password link sent to your email",
    });
    }
    catch(error){
        
    return res.status(404).json({
      success: false,
      message: "Internal server error",
      error:error.message
    });
     }

}
let resetPasscontroller = async(req,res)=>{
    try{
        let {token} = req.params
        let {password} = req.body
        if(!token||!password){
            return res.status(400).json({
                message:"All fields are required"
            })
        }

        let decode = await jwt.verify(token,process.env.RESET_SECRET_KEY)
         console.log(decode);
         
        let user = await UserModel.findById(decode.userId)
        let hashedPass = await bcrypt.hash(password, 10)

        user.password = hashedPass
        await user.save()


      return res.status(200).json({
      success: true,
      message: "Password reset successfully",
      });

    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
        })
    }
}
    

module.exports ={ registerController, loginController,getmecontroller,logoutcontroller, forgetpasswordcontroller,resetPasscontroller}