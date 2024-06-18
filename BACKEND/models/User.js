const mongoose=require("mongoose");
const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        unique:true,
    },
    username:{
        type:String,
        min:2,
        max:50,
        unique:false
    },
    password:{
        type:String,
        unique:true,
        min:5,
        unique:false
    },
    phone:{
        type:Number,
        unique:true
    },
    
},
{timestamps:true}

);
module.exports = mongoose.model("User",UserSchema);