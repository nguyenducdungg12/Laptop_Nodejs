const jwt = require('../helpers/jwt');
require("dotenv").config();

const {SECRETKEY} = process.env;

module.exports = {
    isUserValid : async (req,res,next)=>{
        const token = req.headers.authorization;
        try{
            const UserJwt = await jwt.verifyToken(token,SECRETKEY);
            req.user=UserJwt;
            next();
        }
        catch(err){
            res.status(500).json(err);
        }
    }   
}