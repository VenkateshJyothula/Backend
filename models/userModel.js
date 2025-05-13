const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
const validator = require('validator')
const userSchema=mongoose.Schema({
  name:
  {
    type:String,
    required:true,
    trim:true,
  },
  email:
  {
    type:String,
    unique:true,
    trim:true,
    required:true,
  },
  password:
  {
    type:String,
    required:true,
  }
},{
  timestamps:true,
  collection:'Users',
});


userSchema.statics.register=async function (name,email,password)
{
    try {

      if(!validator.isEmail(email))
      {
        throw new Error("Invalid Mail format");
      }
      const options = {
        minLength: 8,
        minLowercase: 0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0,
      };
      if(!validator.isStrongPassword(password,options))
      {
        throw new Error("Password Should contain atleast 8 characters");
        
      }
      const user=await this.find({email});
      if(user)
      {
        throw new Error("Mail already registered");
      }
      const saltRounds=10;
      const hash=await bcrypt.hash(password,saltRounds);
      const newUser=new this({name,email,password:hash})
      try {
        const resDB=await newUser.save();
        return resDB;
      } catch (error) {
        throw new Error("Failed to Register User");
      }
    } 
    catch (error) {
      throw new Error(error.message);
    }
}

userSchema.statics.login=async function(email,password)
{
  try {
    const user=await this.findOne({email});
    if(!user)
    {
      throw new Error("Email is not Registered");
    }
    const isPasswordSame=await bcrypt.compare(password,user.password); 
    if(isPasswordSame)
    {
      return user;
    }
    else
    throw new Error("Invalid Login Credentials");
  } 
  catch (error) {
    throw new Error("Error logging in."+error.message);
  }
}

userSchema.statics.getUsers= async function(){
  try {
    const allUsers=await this.find();
    return allUsers;
  } 
  catch (error) {
    throw new Error("Error getting Users");
  }
}

userSchema.statics.getUser= async function({email}){
  try {
    const user=await this.find({email});
    if(!user)
    {
      throw new Error("No user Found");
    }
    return user;
  } 
  catch (error) {
    throw new Error("Error getting Users");
  }
}


const userModel=mongoose.model("User",userSchema);

module.exports= userModel