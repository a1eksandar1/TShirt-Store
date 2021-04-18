const express = require('express');
const router = express.Router();

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:"get req to /tshirts"
    });
});

router.get('/:tshirtId',(req,res,next)=>{
    const id=req.params.tshirtId;
    res.status(200).json({
        message:"get req to /tshirts/id with id:"+id
    });
});

module.exports=router;