const userModel=require('../models/userModel.js')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken');
const registerUser=async (req,res)=>{
  try {
    const {name,email,password}=req.body;
    const newUser=await userModel.register(name,email,password);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({message:error.message});
  }
}

const getUserProfile=async (req,res)=>{
  try {
    const authHeader=req.header('Authorization');
    if(!authHeader)
    {
      res.status(401).json({message:"No Token provided"})
    }
    const token=authHeader.replace('Bearer ','');

    const data=jwt.verify(token,process.env.SECRET);
    if(!data || !data.email)
    {
      res.status(401).json({message:"Invalid Token"});
    }

    const user=await userModel.getUser({email:data.email});
    console.log(user);
    res.status(200).json({name:user[0].name,email:user[0].email});
  } catch (error) {
    res.status(401).json({message:error.message});
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await userModel.login(email, password);

    if (result) {
      const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: '1h' });
      const Modtoken='Bearer '+token
      return res.status(200).json({ message: "Valid Login Credentials", token:Modtoken });
    } 
    return res.status(401).json({ message: "Invalid email or password" });
    
  } catch (error) {
    return res.status(500).json({ message: "Server Error", error: error.message });
  }
};


const getallusers = async (req, res) => {
  try {
    const users=await userModel.getUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(401).json({message:error.message});
  }
}

module.exports={registerUser,loginUser,getUserProfile}