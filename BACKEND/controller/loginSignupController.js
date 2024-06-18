const bcrypt = require('bcryptjs')
const { User } = require("../models");
const jwt = require('jsonwebtoken')


const createUser = async (req, res, next) => {
    try{
     const {
       username,
       email,
       phone,
       password,
     } = req.body;
   
     if(!email || !username || !phone || !password){
       res.status(404).send("Provide The fields");
     }

     const salt = bcrypt.genSaltSync(10);
     const bcrypt_password = bcrypt.hashSync(password, salt);
    
     const newUser=new User({
       email,
       username,
       phone,
       password:bcrypt_password,
     })
     const createUser = await newUser.save();
   
     res.status(200).send({status:"ok",data:createUser});
   
    }catch(error){
     next(error);
    }
   
   };




   const loginUser = async (req, res, next) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).send("Provide The fields");
      }
  
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.status(404).send("Provided email not found");
      }
  
      if (await bcrypt.compare(password, oldUser.password)) {
        const token = jwt.sign({ email: oldUser.email, username: oldUser.username }, process.env.JWT_SECRET, {
          expiresIn: '3h'
        });
  
        return res.status(200).send({ status: "ok", token: token });
      } else {
        return res.status(401).send('Invalid Password');
      }
    } catch (error) {
      next(error);
    }
  };

module.exports={createUser,loginUser};