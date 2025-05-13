
const {getAllCanvases, createCanvas,loadCanvas,deleteCanvas,updateCanvas} =require('../Controllers/canvasController.js');
const authenticatiomMiddleware =require("../Middlewares/authenticationMiddleware.js")
const express=require('express')
const router = express.Router();


router.get('/',authenticatiomMiddleware,getAllCanvases);
router.delete('/:id',authenticatiomMiddleware,deleteCanvas)
router.post('/',authenticatiomMiddleware,createCanvas);
router.get('/:id',authenticatiomMiddleware,loadCanvas);
router.put('/:id',authenticatiomMiddleware,updateCanvas);

module.exports=router;