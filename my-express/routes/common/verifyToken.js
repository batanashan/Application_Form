

var jwt = require('jsonwebtoken')
function verifyToken(req,res,next){
    const token = req.headers.authorization
    if(token){
               jwt.verify(token,'my-token',function(e){
                if(e){
                    res.status(401).send("Invalid Token")
                }
                else{
                    next()
                }

               })
      
    }
    else{
        res.status(401).send("Token Missing")
    }

  
   
    }
    
    module.exports = verifyToken;