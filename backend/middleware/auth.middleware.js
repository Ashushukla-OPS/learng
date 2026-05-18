const jwt = require("jsonwebtoken")
const UserModel = require("../model/user.model")

const authMiddleware = async(req,res,next)=>{
    try{
        let token = req.cookies.token
        if(!token){
            return res.status(401).json({
                message:"token missing pls login"
            })
        }
        let decode = await jwt.verify(token, process.env.SECRET_KEY)
    console.log(decode);
    
      let user = await UserModel.findById(decode.userId)

      if(!user){
        return res.status(401).json({
            message:"user not found pls login "
        })
      }
      req.user = user
      next()
    }
    catch(error){
        console.log(error);
        
        return res.status(404).json({
            message:"user not fetched pls login",
            error:error.message
        })
    }
}
module.exports = authMiddleware