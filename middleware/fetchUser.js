const jwt = require('jsonwebtoken')
require('dotenv').config({path: './.env'})


const fetchUser = (req,res,next) =>{

    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error:"Please authenticate Using a valid token"})
    }

    try {
        const data = jwt.verify(token,process.env.JWT_SECRET)
        req.user = data.user;

        console.log(req.user);

        next();
    } catch (error) {
        res.status(401).send({error:"Please authenticate Using a valid token"})
    }
    
}

module.exports = fetchUser;