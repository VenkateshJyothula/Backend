const jwt = require('jsonwebtoken');

const authenticatiomMiddleware=async(req,res,next)=>{
    const authHeader=req.header('Authorization');
    if(!authHeader)
    {
        res.status(401).json({message:"No Token provided"})
    }
    const token=authHeader.replace('Bearer ','');

    const data=jwt.verify(token,process.env.SECRET);
    req.body={...(req.body),email:data.email}
    next();
}

module.exports=authenticatiomMiddleware;