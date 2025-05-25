const jwt = require('jsonwebtoken');
const {promisify} = require('util');
const admin = require('../model/adminSchema');
const { decrypt } = require('dotenv');

exports.isAuthenticated = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token){
        // res.status(404).json({ error: "Token not found" });
        res.render('login',{message:'Please Login First!!!'});
        return;
    }
    const decryptedResult = await promisify (jwt.verify)(token,process.env.SECRETKEY);
    const validUser = await admin.findOne({
        _id:decryptedResult.id
    });
    if(!validUser){
        return res.status(404).json({ error: "User not found" });

    }
    else{
        //  res.status(200).json({ error: decryptedResult });
        req.user = decryptedResult.id;
        // console.log('successfully decryted id-',req.user);
        next();
    }
   

}