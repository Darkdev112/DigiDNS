const jwt=require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes');

const JWT_SECRET = "DNSserver";

const authentication = async (req, res , next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      res.send({
        status:StatusCodes.UNAUTHORIZED,
        message:'No token provided'
      })
    }
  
    const token = authHeader.split(' ')[1]
  
    try {
      const decoded = jwt.verify(token, JWT_SECRET)
      const {email,username}=decoded;
      req.auth={email,username};
      next();
    } catch (error) {
      res.send({
        status:StatusCodes.NOT_FOUND,
        message:'Not authorized to access this route'
      })
    }
}

module.exports=authentication;