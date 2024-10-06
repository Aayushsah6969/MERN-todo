import jwt from 'jsonwebtoken';
import User from '../model/user.model.js';


export const generateTokenANdsaveinCookies=async (userId, res)=>{
   const token =  jwt.sign({userId}, process.env.JWT_SECRET_KEY,{
        expiresIn: '5h'
    })
    res.cookie("Jwt",token,{
        httpOnly: true,
        secure:false,
        sameSite:"lax",
        path:"/"
    })

   await  User.findByIdAndUpdate(userId,{token})
   return token;
}