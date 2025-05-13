const canvasModel=require('../models/canvasModel.js');
const userModel = require('../models/userModel.js');


const getAllCanvases=async (req,res)=>{
    const {email}=req.body;
    try{
        const canvases=await canvasModel.getAllCanvases(email);
        res.status(200).json(canvases);
    }
    catch(error)
    {
        res.status(400).json(error.message);
    }
}

const updateCanvas=async(req,res)=>{
    const {email,elements}=req.body;
    console.log(elements[elements.length-1]);
    const {id}=req.params;
    try {
        await canvasModel.updateCanvas(id, elements);
        res.status(200).json({ updated: true, message: "Canvas updated successfully" });
    } catch (error) {
        res.status(400).json({ updated: false, message: error.message });
    }    
}

const deleteCanvas=async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params;
    try{
        await canvasModel.deleteCanvas(email,id);
        res.status(200).json({deleted:true,message:"Deleted successfully"});
    }
    catch{
        res.status(400).json({deleted:false,message:"deletion failed"});
    }
}

const createCanvas=async(req,res)=>{
    const {email,name}=req.body;
    try {
        const newCanvas=await canvasModel.createCanvas(email,name);
        res.status(200).json(newCanvas||{message:"Newcanvas"});
    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

const loadCanvas=async(req,res)=>{
    const {email}=req.body;
    const {id}=req.params;
    try {
        const data=await canvasModel.loadCanvas(email,id);
        res.status(200).json(data);

    } catch (error) {
        res.status(400).json({message:error.message});
    }
}

module.exports={getAllCanvases,createCanvas,loadCanvas,deleteCanvas,updateCanvas};